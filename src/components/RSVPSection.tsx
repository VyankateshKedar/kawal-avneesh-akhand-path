"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  fullName: string;
  phone: string;
  attending: string;
  events: string[];
  guests: number;
}

const eventOptions = [
  { id: "akhand-path", label: "Samapti Sri Akhand Path Sahib Ji" },
  { id: "sangeet", label: "Sangeet" },
  { id: "anand-karaj", label: "Anand Karaj" },
];

export default function RSVPSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    attending: "",
    events: [],
    guests: 1,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Data:", formData);
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="relative py-16 sm:py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-peach-light/20 to-cream" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-sm tracking-[0.3em] text-gold-dark uppercase"
            style={{ fontFamily: "var(--font-serif-body)" }}
          >
            We await your reply
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-navy mt-3"
            style={{ fontFamily: "var(--font-script)" }}
          >
            RSVP Kindly
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-sm">✦</span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              {/* Full Name */}
              <div className="mb-5">
                <label
                  htmlFor="rsvp-fullname"
                  className="block text-sm text-navy/70 mb-1.5 tracking-wide"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Full Name
                </label>
                <input
                  id="rsvp-fullname"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gold/20 text-navy placeholder-navy/30 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-5">
                <label
                  htmlFor="rsvp-phone"
                  className="block text-sm text-navy/70 mb-1.5 tracking-wide"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Phone Number
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gold/20 text-navy placeholder-navy/30 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Will you attend */}
              <div className="mb-5">
                <label
                  htmlFor="rsvp-attending"
                  className="block text-sm text-navy/70 mb-1.5 tracking-wide"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Will you be attending?
                </label>
                <select
                  id="rsvp-attending"
                  required
                  value={formData.attending}
                  onChange={(e) =>
                    setFormData({ ...formData, attending: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gold/20 text-navy focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300 appearance-none cursor-pointer"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  <option value="" disabled>
                    Select your response
                  </option>
                  <option value="yes">Yes, I will be there!</option>
                  <option value="no">Sorry, I can&apos;t make it</option>
                </select>
              </div>

              {/* Which events - Multi select */}
              <div className="mb-5">
                <label
                  className="block text-sm text-navy/70 mb-2.5 tracking-wide"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Which event(s) will you attend?
                </label>
                <div className="space-y-2.5">
                  {eventOptions.map((event) => (
                    <motion.label
                      key={event.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.events.includes(event.id)
                          ? "bg-gold/10 border-gold/40 shadow-sm"
                          : "bg-white/40 border-gold/15 hover:bg-white/60"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          formData.events.includes(event.id)
                            ? "bg-gold border-gold"
                            : "border-gold/30"
                        }`}
                      >
                        {formData.events.includes(event.id) && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formData.events.includes(event.id)}
                        onChange={() => handleEventToggle(event.id)}
                      />
                      <span
                        className="text-sm text-navy/80"
                        style={{ fontFamily: "var(--font-serif-body)" }}
                      >
                        {event.label}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              <div className="mb-8">
                <label
                  htmlFor="rsvp-guests"
                  className="block text-sm text-navy/70 mb-1.5 tracking-wide"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Number of Guests
                </label>
                <input
                  id="rsvp-guests"
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guests: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gold/20 text-navy focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-300"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-medium tracking-wider uppercase text-sm shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
                style={{ fontFamily: "var(--font-serif-body)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send RSVP
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass-card rounded-2xl p-8 sm:p-12 shadow-xl text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="w-20 h-20 mx-auto rounded-full bg-green-pastel/40 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-green-deep"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3
                className="text-2xl sm:text-3xl text-navy mb-3"
                style={{ fontFamily: "var(--font-script)" }}
              >
                Thank You!
              </h3>
              <p
                className="text-navy/60 text-sm sm:text-base"
                style={{ fontFamily: "var(--font-serif-body)" }}
              >
                We have received your RSVP, {formData.fullName}. We look forward
                to celebrating with you!
              </p>
              <motion.div className="mt-6">
                <span className="text-gold text-2xl">✦ ✦ ✦</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
