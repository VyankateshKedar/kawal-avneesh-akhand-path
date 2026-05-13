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

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="ek-onkar text-5xl sm:text-6xl leading-none block mb-3">
            ੴ
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-navy"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Wedding Invitation
          </h1>
          <p
            className="text-base sm:text-lg text-navy/70 mt-3"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            Kawalpreet Kaur & Avneesh Singh
          </p>
        </motion.div>

        {/* Family Details Section */}
        {/* <motion.div
          className="mb-12 bg-white/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2
            className="text-2xl sm:text-3xl text-navy mb-6 text-center"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Family Details
          </h2>
          <div className="space-y-4 text-navy/80" style={{ fontFamily: "var(--font-serif-body)" }}>
            <p className="text-base">
              <span className="font-semibold text-navy">Bride:</span> Kawalpreet Kaur (Daughter of Kulwant Singh & Gurmeet Kaur Muchal)
            </p>
            <p className="text-base">
              <span className="font-semibold text-navy">Groom:</span> Avneesh Singh (Son of Harjeet Singh & Harvinder Kaur Gurudatta, Pune)
            </p>
            <p className="text-base">
              <span className="font-semibold text-navy">Host Family:</span> Muchal Family
            </p>
          </div>
        </motion.div> */}

        {/* Event Schedule Section */}
        {/* <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2
            className="text-2xl sm:text-3xl text-navy mb-6 text-center"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Event Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base" style={{ fontFamily: "var(--font-serif-body)" }}>
              <thead>
                <tr className="border-b-2 border-gold/40">
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-navy">Event</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-navy">Date</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-navy">Time</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-navy">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gold/20 hover:bg-gold/5 transition">
                  <td className="px-3 sm:px-4 py-3 font-semibold text-navy">Samapti Shri Akhand Path Sahib Ji</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">Thu, Jun 4, 2026</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">12:00 PM – 1:30 PM</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">Gurudwara Shri Guru Tegh Bahadur Langar Sahib, Chh. Sambhajinagar (Aurangabad)</td>
                </tr>
                <tr className="border-b border-gold/20 hover:bg-gold/5 transition">
                  <td className="px-3 sm:px-4 py-3 font-semibold text-navy">Celebration (#NeeSHKwalaLove)</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">Tue, Jun 9, 2026</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">8:30 PM Onwards</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">The Imperial Hall, Corinthians Club, Pune</td>
                </tr>
                <tr className="border-b border-gold/20 hover:bg-gold/5 transition">
                  <td className="px-3 sm:px-4 py-3 font-semibold text-navy">Anand Karaj</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">Wed, Jun 10, 2026</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">1:00 PM Onwards</td>
                  <td className="px-3 sm:px-4 py-3 text-navy/80">Guru Nanak Darbar (Hollywood Gurudwara) Camp, Pune</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div> */}

        {/* Additional Information Section */}
        {/* <motion.div
          className="bg-white/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2
            className="text-2xl sm:text-3xl text-navy mb-6 text-center"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Additional Information
          </h2>
          <div className="space-y-3 text-navy/80" style={{ fontFamily: "var(--font-serif-body)" }}>
            <p className="text-base">
              <span className="font-semibold text-navy">Wedding Hashtag:</span> #NeeSHKwalaLove
            </p>
            <p className="text-base">
              <span className="font-semibold text-navy">Officiating (Anand Karaj):</span> Bhai Surinderpal Singh Ji (Raipurwale)
            </p>
          </div>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
