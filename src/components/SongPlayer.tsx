"use client";

import { motion } from "framer-motion";

export default function SongPlayer() {
  return (
    <section
      id="song"
      className="relative py-16 sm:py-24 px-4 overflow-hidden"
    >
      {/* Background music audio */}
      <audio
        autoPlay
        loop
        className="hidden"
      >
        <source src="/music/Kanda Kacheya Ne Daana Paani.mp4" type="audio/mpeg" />
      </audio>

      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-peach-light/20 to-cream" />

      {/* Section header */}
      <motion.div
        className="relative z-10 text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <span
          className="text-sm tracking-[0.3em] text-gold-dark uppercase"
          style={{ fontFamily: "var(--font-serif-body)" }}
        >
          Our Love Song
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-navy mt-3"
          style={{ fontFamily: "var(--font-script)" }}
        >
          A Journey in Melody
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold text-sm">♪ ♪ ♪</span>
          <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </motion.div>

      {/* Decorative music note icon */}
      <motion.div
        className="relative z-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-peach-light/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center shadow-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gold"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-2 13.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-peach-light/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Quote below */}
      <motion.div
        className="relative z-10 text-center mt-12 sm:mt-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p
          className="text-lg sm:text-xl text-navy/80 italic"
          style={{ fontFamily: "var(--font-serif-body)" }}
        >
          "Kanda Kacheya Ne Daana Paani"
        </p>
        <p
          className="text-sm sm:text-base text-navy/60 mt-2"
          style={{ fontFamily: "var(--font-serif-body)" }}
        >
          The perfect melody for our celebration
        </p>
      </motion.div>
    </section>
  );
}
