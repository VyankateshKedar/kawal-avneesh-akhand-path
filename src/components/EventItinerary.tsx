"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface EventCard {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  followedBy?: string;
  location: string;
  image: string;
  imageAlt: string;
  darkOverlay?: boolean;
  hashtag?: string;
}

const events: EventCard[] = [
  {
    id: "akhand-path",
    title: "Samapti Sri Akhand Path Sahib Ji",
    date: "Thursday, June 4, 2026",
    time: "12:00 PM – 1:30 PM",
    followedBy: "Followed by Preeti Bhoj",
    location:
      "Gurudwara Sri Guru Tegh Bahadur Langar Sahib, Chh. Sambhajinagar, A'bad.",
    image: "/images/gurudwara-scene.png",
    imageAlt: "Serene Gurudwara building with golden domes",
  },
  {
    id: "sangeet",
    title: "Cocktail & Sangeet Night",
    subtitle: "Let's dance and groove to the tunes of love celebrating",
    hashtag: "#NeeSHKwalaLove",
    date: "Tuesday, June 9, 2026",
    time: "8:30 PM Onwards",
    followedBy: "Followed by Cocktail & Dinner",
    location: "The Imperial Hall, Corinthians Club, Pune.",
    image: "/images/cocktail-sangeet.jpeg",
    imageAlt: "Glamorous sangeet scene with couple dancing",
    darkOverlay: true,
  },
  {
    id: "anand-karaj",
    title: "Anand Karaj",
    date: "Wednesday, June 10, 2026",
    time: "Baraat Swagat: 12:00 PM | Anand Karaj: 1:00 PM",
    followedBy: "Followed by Lunch",
    location:
      "Gurudwara Guru Nanak Darbar Camp, Pune (Hollywood Gurudwara).",
    image: "/images/anand-karaj.jpeg",
    imageAlt: "Traditional Sikh wedding ceremony inside Gurudwara",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function EventItinerary() {
  return (
    <section id="events" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-green-soft/20 to-cream" />

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
          Save the Dates
        </span>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-navy mt-3"
          style={{ fontFamily: "var(--font-script)" }}
        >
          The Celebration Unfolds
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold text-sm">✦ ✦ ✦</span>
          <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      </motion.div>

      {/* Event Cards */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-10 sm:space-y-14">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            id={`event-${event.id}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
          >
            {/* Card image background */}
            <div className="relative w-full h-96 sm:h-[450px] md:h-[550px]">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
              {/* Dark overlay for readability */}
              <div
                className={`absolute inset-0 ${
                  event.darkOverlay
                    ? "bg-gradient-to-t from-black/50 via-black/20 to-transparent"
                    : "bg-gradient-to-t from-navy/80 via-navy/40 to-transparent"
                }`}
              />

              {/* Event number badge */}
              <motion.div
                className="absolute top-4 left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <span
                  className="text-white text-lg sm:text-xl font-bold"
                  style={{ fontFamily: "var(--font-serif-display)" }}
                >
                  {index + 1}
                </span>
              </motion.div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 z-20">
                {/* Hashtag */}
                {event.hashtag && (
                  <motion.div
                    className="mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold-light text-xs sm:text-sm tracking-wide">
                      {event.hashtag}
                    </span>
                  </motion.div>
                )}

                {/* Subtitle */}
                {event.subtitle && (
                  <p
                    className="text-white/80 text-sm sm:text-base mb-2 italic"
                    style={{ fontFamily: "var(--font-serif-body)" }}
                  >
                    {event.subtitle}
                  </p>
                )}

                {/* Title */}
                <h3
                  className="text-2xl sm:text-3xl text-white mb-4 drop-shadow-md"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {event.title}
                </h3>

                {/* Glass info card */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 space-y-3">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gold-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-white font-medium text-sm sm:text-base"
                        style={{ fontFamily: "var(--font-serif-body)" }}
                      >
                        {event.date}
                      </p>
                      <p
                        className="text-white/80 text-xs sm:text-sm mt-0.5"
                        style={{ fontFamily: "var(--font-serif-body)" }}
                      >
                        {event.time}
                      </p>
                      {event.followedBy && (
                        <p className="text-gold-light text-xs mt-1 italic">
                          {event.followedBy}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/15" />

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gold-light"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-white/90 text-xs sm:text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-serif-body)" }}
                    >
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline connector line */}
      <div className="absolute left-1/2 top-40 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent -translate-x-1/2 hidden sm:block" />
    </section>
  );
}
