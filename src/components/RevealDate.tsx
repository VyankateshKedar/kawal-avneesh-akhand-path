"use client";

import { motion } from "framer-motion";

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
        <motion.p
          className="text-sm tracking-[0.3em] text-gold-dark uppercase font-semibold mb-8"
          style={{ fontFamily: "var(--font-serif-body)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Reveal The Date
        </motion.p>

        {/* Main date - Professional serif font */}
        <motion.h2
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
        </motion.h2>

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
          Let’s celebrate the beautiful beginning of our forever together.
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
