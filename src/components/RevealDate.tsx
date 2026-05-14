"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// --- Types ---
interface CardProps {
  value: string;
  label: string;
  delay: number;
}

type Pos = { x: number; y: number };

// --- Constants ---
const DATE_CARDS = [
  { value: "10",   label: "DAY"   },
  { value: "June", label: "MONTH" },
  { value: "2026", label: "YEAR"  },
];

const CIRCLE_SIZE = 140;
const SCRATCH_THRESHOLD = 55;

// --- Helper: Draw the Gold Petal Texture ---
function drawPetalTexture(ctx: CanvasRenderingContext2D, size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
  ctx.clip();

  // Base Gold
  ctx.fillStyle = "#C9922A";
  ctx.fillRect(0, 0, size, size);

  // Shimmer Gradient
  const shimmer = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
  shimmer.addColorStop(0,   "rgba(255,220,120,0.55)");
  shimmer.addColorStop(0.5, "rgba(180,130,30,0.3)");
  shimmer.addColorStop(1,   "rgba(100,60,0,0.4)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, size, size);

  // Petal Ribs
  const ribCount = 18;
  for (let i = 0; i < ribCount; i++) {
    const angle = (i / ribCount) * Math.PI * 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo( 8, -r * 0.35, -8, -r * 0.6,  0, -r * 0.98);
    ctx.bezierCurveTo( 8, -r * 0.6,  -8, -r * 0.35,  0,  0);
    ctx.fillStyle = "rgba(0,0,0,0.09)";
    ctx.fill();
    ctx.restore();
  }

  // Highlight
  const hl = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx - r * 0.1, cy - r * 0.1, r * 0.7);
  hl.addColorStop(0,   "rgba(255,235,160,0.45)");
  hl.addColorStop(0.6, "rgba(255,200,80,0.08)");
  hl.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, size, size);

  // Border
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

// --- Component: Individual Scratch Card ---
function ScratchCard({ value, label, delay }: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const isDrawing = useRef(false);
  const lastPos = useRef<Pos | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = CIRCLE_SIZE * dpr;
    canvas.height = CIRCLE_SIZE * dpr;
    ctx.scale(dpr, dpr);

    drawPetalTexture(ctx, CIRCLE_SIZE);
  }, []);

  useEffect(() => { initCanvas(); }, [initCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, canvas: HTMLCanvasElement): Pos => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    return {
      x: (clientX - rect.left) * (CIRCLE_SIZE / rect.width),
      y: (clientY - rect.top) * (CIRCLE_SIZE / rect.height)
    };
  };

  const scratch = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 44;

    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 22, 0, Math.PI * 2);
    }
    ctx.stroke();
    lastPos.current = { x, y };
  };

  const checkReveal = (ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, CIRCLE_SIZE * dpr, CIRCLE_SIZE * dpr).data;
    let transparent = 0;
    // Performance optimization: check every 16th pixel
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 150) transparent++;
    }
    const total = data.length / 16;
    if ((transparent / total) * 100 > SCRATCH_THRESHOLD) {
      setRevealed(true);
    }
  };

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    isDrawing.current = true;
    setScratching(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const pos = getPos(e, canvas);
      scratch(ctx, pos.x, pos.y);
    }
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const pos = getPos(e, canvas);
      scratch(ctx, pos.x, pos.y);
      checkReveal(ctx);
    }
  };

  const onEnd = () => {
    isDrawing.current = false;
    lastPos.current = null;
    setScratching(false);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
    >
      <div className="relative" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        <div
          className="absolute inset-0 rounded-full flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FEFCF9 0%, #FFF3DF 100%)",
            border: "2px solid rgba(201,168,76,0.35)",
            boxShadow: "0 4px 24px rgba(180,130,30,0.12)",
          }}
        >
          <span style={{
            fontFamily: "serif",
            fontSize: value.length > 2 ? "1.5rem" : "2.4rem",
            fontWeight: 700,
            color: "#8B1A2F",
            lineHeight: 1,
          }}>
            {value}
          </span>
          <span style={{
            fontFamily: "serif",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            color: "#C9A84C",
            marginTop: "6px",
            fontWeight: 600,
          }}>
            {label}
          </span>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            cursor: revealed ? "default" : scratching ? "grabbing" : "grab",
            touchAction: "none",
            borderRadius: "50%",
            display: revealed ? "none" : "block",
          }}
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
        />

        {revealed && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.6 }}
            style={{ border: "2px solid rgba(201,168,76,0.6)" }}
          />
        )}
      </div>

      {!revealed && (
        <motion.p
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "#C9A84C", opacity: 0.7 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scratch
        </motion.p>
      )}
    </motion.div>
  );
}

// --- Main Section Component ---
export default function RevealDate() {
  return (
    <motion.section
      id="reveal-date"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #FEFCF9 0%, #FFF8F0 50%, #FEFCF9 100%)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Bg Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(201, 168, 76, 0.05)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(45, 74, 62, 0.05)" }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-16 flex justify-center text-4xl text-[#C9A84C]"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          ✦
        </motion.div>

        <motion.div
          className="w-20 h-0.5 mx-auto mb-12"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />

        <motion.h3
          className="text-3xl sm:text-5xl font-light mb-8"
          style={{
            fontFamily: "var(--font-script)",
            color: "#C9A84C",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Kawalpreet Kaur & Avneesh Singh
        </motion.h3>

        <motion.p
          className="text-base sm:text-lg leading-relaxed mb-16 max-w-xl mx-auto text-slate-700"
          style={{ fontFamily: "var(--font-script)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          Let&apos;s celebrate the beautiful beginning of our forever together.
        </motion.p>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          viewport={{ once: true }}
        >
          <h3 style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 400,
            color: "#1B2A4A",
            lineHeight: 1.1,
            marginBottom: "0.4rem",
          }}>
            Reveal
          </h3>

          <p className="text-[10px] tracking-[0.28em] uppercase mb-10 text-gray-400">
            Scratch to discover the date
          </p>

          <div className="flex justify-center gap-5 sm:gap-8 mb-12">
            {DATE_CARDS.map((card, i) => (
              <ScratchCard key={card.label} {...card} delay={1.0 + i * 0.15} />
            ))}
          </div>

          <div className="flex justify-center">
            <svg width="220" height="20" viewBox="0 0 220 20" fill="none">
              <path
                d="M2 10 C20 2,40 18,60 10 S100 2,120 10 S160 18,180 10 S210 2,218 10"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center text-3xl opacity-60 text-[#C9A84C]"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          ✦
        </motion.div>
      </motion.div>
    </motion.section>
  );
}