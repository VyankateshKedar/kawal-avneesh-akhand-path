"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const DATE_CARDS = [
  { value: "10",   label: "DAY"   },
  { value: "June", label: "MONTH" },
  { value: "2026", label: "YEAR"  },
];

const CIRCLE_SIZE = 140;
const SCRATCH_THRESHOLD = 55;

function drawPetalTexture(ctx, size) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = "#C9922A";
  ctx.fillRect(0, 0, size, size);

  const shimmer = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r);
  shimmer.addColorStop(0,   "rgba(255,220,120,0.55)");
  shimmer.addColorStop(0.5, "rgba(180,130,30,0.3)");
  shimmer.addColorStop(1,   "rgba(100,60,0,0.4)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, size, size);

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

  const hl = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx - r * 0.1, cy - r * 0.1, r * 0.7);
  hl.addColorStop(0,   "rgba(255,235,160,0.45)");
  hl.addColorStop(0.6, "rgba(255,200,80,0.08)");
  hl.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = hl;
  ctx.fillRect(0, 0, size, size);

  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function ScratchCard({ value, label, delay }) {
  const canvasRef  = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const isDrawing  = useRef(false);
  const lastPos    = useRef(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CIRCLE_SIZE, CIRCLE_SIZE);
    drawPetalTexture(ctx, CIRCLE_SIZE);
  }, []);

  useEffect(() => { initCanvas(); }, [initCanvas]);

  const getPos = (e, canvas) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = CIRCLE_SIZE / rect.width;
    const scaleY = CIRCLE_SIZE / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const scratch = (ctx, x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    if (lastPos.current) {
      ctx.lineWidth = 44;
      ctx.lineCap   = "round";
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPos.current = { x, y };
  };

  const checkReveal = (ctx) => {
    const data  = ctx.getImageData(0, 0, CIRCLE_SIZE, CIRCLE_SIZE).data;
    const total = CIRCLE_SIZE * CIRCLE_SIZE;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    if ((transparent / total) * 100 > SCRATCH_THRESHOLD) {
      ctx.clearRect(0, 0, CIRCLE_SIZE, CIRCLE_SIZE);
      setRevealed(true);
    }
  };

  const onStart = (e) => {
    e.preventDefault();
    if (revealed) return;
    isDrawing.current = true;
    lastPos.current   = null;
    setScratching(true);
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    scratch(ctx, pos.x, pos.y);
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    scratch(ctx, pos.x, pos.y);
    checkReveal(ctx);
  };

  const onEnd = () => {
    isDrawing.current = false;
    lastPos.current   = null;
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
      <div className="relative flex items-center justify-center" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        {/* Revealed face */}
        <div
          className="absolute inset-0 rounded-full flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FEFCF9 0%, #FFF3DF 100%)",
            border: "2px solid rgba(201,168,76,0.35)",
            boxShadow: "0 4px 24px rgba(180,130,30,0.12)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: value.length > 2 ? "1.5rem" : "2.4rem",
              fontWeight: 700,
              color: "#8B1A2F",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              color: "#C9A84C",
              marginTop: "6px",
              fontWeight: 600,
            }}
          >
            {label}
          </span>
        </div>

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          className="absolute inset-0"
          style={{
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

        {/* Ripple on reveal */}
        {revealed && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.6 }}
            style={{ border: "2px solid rgba(201,168,76,0.6)" }}
          />
        )}
      </div>

      {!revealed && (
        <motion.p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#C9A84C", fontFamily: "var(--font-serif-body)", opacity: 0.7 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scratch
        </motion.p>
      )}
    </motion.div>
  );
}

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
      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/3 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-soft/3 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Top decorative element */}
        <motion.div
          className="mb-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl text-gold">✦</div>
        </motion.div>

        {/* Section label */}
        {/* <motion.p
          className="text-sm tracking-[0.3em] text-gold-dark uppercase font-semibold mb-8"
          style={{ fontFamily: "var(--font-serif-body)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Reveal The Date
        </motion.p> */}

        {/* Main date - Professional serif font */}
        {/* <motion.h2
          className="text-7xl sm:text-8xl md:text-9xl font-bold mb-8 leading-tight"
          style={{
            fontFamily: "var(--font-serif-display)",
            color: "#1B2A4A",
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          10
          <br />
          June
          <br />
          2026
        </motion.h2> */}

        {/* Decorative line */}
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Couple names in professional serif */}
        <motion.h3
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-8"
          style={{
            fontFamily: "var(--font-serif-display)",
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

        {/* Main description */}
        <motion.p
          className="text-base sm:text-lg text-navy/75 leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-serif-body)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          Let's celebrate the beautiful beginning of our forever together.
        </motion.p>

        {/* Location badge - Professional style */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <div className="px-8 py-4 border border-gold/40 rounded-lg bg-white/40 backdrop-blur-sm">
            <p
              className="text-sm tracking-[0.15em] text-gold-dark uppercase"
              style={{ fontFamily: "var(--font-serif-body)" }}
            >
              📍 Pune, India
            </p>
          </div> */}
        </motion.div>

        {/* ── NEW: Interactive scratch reveal ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          viewport={{ once: true }}
        >
          {/* <p
            className="text-xs tracking-[0.35em] uppercase font-semibold mb-2"
            style={{ color: "#C9A84C", fontFamily: "var(--font-serif-body)" }}
          >
            Interactive
          </p> */}

          <h3
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: 400,
              color: "#1B2A4A",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
            }}
          >
            Reveal
          </h3>

          <p
            className="text-xs tracking-[0.28em] uppercase mb-10"
            style={{ color: "#999", fontFamily: "var(--font-serif-body)" }}
          >
            Scratch to discover the date
          </p>

          <div className="flex justify-center gap-5 sm:gap-8 mb-10">
            {DATE_CARDS.map((card, i) => (
              <ScratchCard key={card.label} {...card} delay={1.0 + i * 0.15} />
            ))}
          </div>

          <div className="flex justify-center">
            <svg width="220" height="20" viewBox="0 0 220 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 10 C20 2,40 18,60 10 S100 2,120 10 S160 18,180 10 S210 2,218 10"
                stroke="#C9A84C"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl text-gold/60">✦</div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}