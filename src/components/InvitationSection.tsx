"use client";

import { motion } from "framer-motion";

export default function InvitationSection() {
  return (
    <section
      id="invitation"
      className="relative py-16 sm:py-24 px-4 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white-soft to-cream" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Decorative corner flourishes */}
      <div className="absolute top-8 left-4 sm:left-8 text-gold/30 text-4xl sm:text-5xl select-none">❦</div>
      <div className="absolute top-8 right-4 sm:right-8 text-gold/30 text-4xl sm:text-5xl select-none" style={{ transform: "scaleX(-1)" }}>❦</div>
      <div className="absolute bottom-8 left-4 sm:left-8 text-gold/30 text-4xl sm:text-5xl select-none" style={{ transform: "scaleY(-1)" }}>❦</div>
      <div className="absolute bottom-8 right-4 sm:right-8 text-gold/30 text-4xl sm:text-5xl select-none" style={{ transform: "scale(-1)" }}>❦</div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Ek Onkar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="ek-onkar text-5xl sm:text-6xl leading-none block">
            ੴ
          </span>
          <div className="mt-3 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Header text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-sm sm:text-base text-navy/70 tracking-wide leading-relaxed uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            With the blessings of the Almighty
          </p>
          <p
            className="text-lg sm:text-xl text-gold-dark mt-1 font-semibold"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            Waheguru
          </p>
          <p
            className="text-sm sm:text-base text-navy/60 mt-2 leading-relaxed"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            & Heavenly blessings of
          </p>
          <p
            className="text-sm sm:text-base text-navy/80 mt-1 tracking-wide font-medium"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            LATE NANAK SINGH MUCHAL & KARTAR KAUR
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="my-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-lg">✦</span>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Family invite text */}
        <motion.p
          className="text-base sm:text-lg text-navy/80 leading-relaxed italic"
          style={{ fontFamily: "var(--font-serif-body)", fontWeight: 400 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Muchal family cordially invites you to the wedding ceremony of
        </motion.p>

        {/* Bride */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl text-navy"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Kawalpreet Kaur
          </h2>
          <p
            className="text-sm text-navy/60 mt-2"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            D/o <span className="font-medium text-navy/80">Kulwant Singh Muchal</span> &{" "}
            <span className="font-medium text-navy/80">Gurmeet Kaur</span>
          </p>
        </motion.div>

        {/* & symbol */}
        <motion.div
          className="my-6"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span
            className="text-4xl sm:text-5xl text-gold-gradient inline-block"
            style={{ fontFamily: "var(--font-script)" }}
          >
            &
          </span>
        </motion.div>

        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2
            className="text-3xl sm:text-4xl text-navy"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Avneesh Singh
          </h2>
          <p
            className="text-sm text-navy/60 mt-2"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            S/o <span className="font-medium text-navy/80">Harjeet Singh Gurudatta</span> &{" "}
            <span className="font-medium text-navy/80">Harvinder Kaur</span>
          </p>
          <p
            className="text-xs text-gold-dark mt-1 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Pune
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-12 h-px bg-gold/40" />
          <div className="mx-3 w-2 h-2 bg-gold/60 rounded-full" />
          <div className="w-24 h-px bg-gold/40" />
          <div className="mx-3 w-2 h-2 bg-gold/60 rounded-full" />
          <div className="w-12 h-px bg-gold/40" />
        </motion.div>
      </div>
    </section>
  );
}
