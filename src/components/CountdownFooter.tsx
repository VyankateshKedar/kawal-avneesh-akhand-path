"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-06-10T12:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownBlock({
  value,
  label,
  delay,
}: {
  value: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-navy/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gold/20 overflow-hidden">
        {/* Shimmer layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
        <span
          className="text-2xl sm:text-3xl font-bold text-gold-light relative z-10"
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="mt-2 text-xs sm:text-sm text-navy/60 tracking-widest uppercase"
        style={{ fontFamily: "var(--font-serif-body)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function CountdownFooter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      id="footer"
      className="relative py-16 sm:py-20 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-green-soft/10 to-cream-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-base sm:text-lg text-navy/70 leading-relaxed italic"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            &ldquo;They are not said to be husband and wife who merely sit
            together. Rather they alone are called husband and wife, who have one
            soul in two bodies.&rdquo;
          </p>
          <p
            className="text-sm text-gold-dark mt-3 tracking-wide"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            — Guru Amar Das Ji
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold text-lg">❧</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Countdown header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-sm tracking-[0.3em] text-gold-dark uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Counting Down To
          </span>
          <h3
            className="text-2xl sm:text-3xl text-navy mt-2"
            style={{ fontFamily: "var(--font-script)" }}
          >
            The Big Day
          </h3>
          <p
            className="text-sm text-navy/50 mt-1"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Wednesday, June 10, 2026
          </p>
        </motion.div>

        {/* Countdown blocks */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-5">
          <CountdownBlock value={timeLeft.days} label="Days" delay={0.1} />
          <span className="text-gold text-xl sm:text-2xl font-light mt-[-20px]">
            :
          </span>
          <CountdownBlock value={timeLeft.hours} label="Hours" delay={0.2} />
          <span className="text-gold text-xl sm:text-2xl font-light mt-[-20px]">
            :
          </span>
          <CountdownBlock
            value={timeLeft.minutes}
            label="Minutes"
            delay={0.3}
          />
          <span className="text-gold text-xl sm:text-2xl font-light mt-[-20px]">
            :
          </span>
          <CountdownBlock
            value={timeLeft.seconds}
            label="Seconds"
            delay={0.4}
          />
        </div>

        {/* Closing text */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p
            className="text-navy/90 text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Made with love
          </p>
          <p
            className="text-lg sm:text-xl text-gold mt-2 animate-shimmer"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Kawalpreet & Avneesh
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="w-1 h-1 rounded-full bg-gold/40" />
          </div>
        </motion.div>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p
            className="text-navy/90 text-xs font-bold leading-relaxed tracking-widest uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Your presence will make our special day even more memorable.
          </p>
          {/* <p
            className="text-lg sm:text-xl text-gold mt-2 animate-shimmer"
            style={{ fontFamily: "var(--font-script)" }}
          >
            K & A
          </p> */}
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="w-1 h-1 rounded-full bg-gold/40" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
