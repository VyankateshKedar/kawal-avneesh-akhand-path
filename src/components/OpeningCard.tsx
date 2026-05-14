"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface OpeningCardProps {
  onEnter: () => void;
}

export default function OpeningCard({ onEnter }: OpeningCardProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleEnter}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background garden image - Mobile version */}
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/images/cover-v1.jpeg"
              alt="Garden scene with couple on swing - Mobile"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 via-transparent to-green-deep/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-green-dark/30" />
          </div>

          {/* Background garden image - Desktop version */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/images/cover.jpeg"
              alt="Garden scene with couple on swing - Desktop"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 via-transparent to-green-deep/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-green-dark/30" />
          </div>

          {/* Decorative corner borders */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-gold/60" />

          {/* Content area - positioned absolutely at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center px-4 text-center max-w-2xl w-full pt-4 sm:pt-8 md:pt-12">
            {/* AK Monogram */}
            <motion.div
              className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 mb-3 sm:mb-4 md:mb-6"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.3,
              }}
            >
              <Image
                src="/images/AK wedding logo.png"
                alt="AK Monogram"
                fill
                className="object-contain drop-shadow-lg"
              />
              {/* Glow effect behind monogram */}
              <div className="absolute inset-0 rounded-full bg-gold/10 blur-2xl scale-150 animate-gentle-pulse" />
            </motion.div>

            {/* Names */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            >
              <h1
                className="text-sm sm:text-lg md:text-lg text-white font-[var(--font-script)] tracking-wide drop-shadow-lg"
                style={{ fontFamily: "var(--font-script)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
              >
                Kawalpreet
              </h1>
              <motion.span
                className="block text-lg sm:text-2xl md:text-3xl text-gold-gradient my-1 sm:my-2"
                style={{ fontFamily: "var(--font-serif-body)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                &
              </motion.span>
              <h1
                className="text-sm sm:text-lg md:text-lg text-white font-[var(--font-script)] tracking-wide drop-shadow-lg"
                style={{ fontFamily: "var(--font-script)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
              >
                Avneesh
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-2 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-white/90 font-bold tracking-[0.2em] sm:tracking-[0.3em] capitalize px-2"
              style={{ fontFamily: "var(--font-serif-body)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              With the Blessings of Waheguru, we invite you to celebrate the union of our Hearts and Families.
            </motion.p>

            {/* Tap to enter - Below tagline */}
            <motion.div
              className="mt-52 sm:mt-12 md:mt-16 flex flex-col items-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              <motion.div
                className="px-6 py-2 sm:px-8 sm:py-3 rounded-full border border-gold/60 bg-cream/70 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span
                  className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-gold-dark uppercase"
                  style={{ fontFamily: "var(--font-serif-body)" }}
                >
                  Tap to Open
                </span>
              </motion.div>
              <motion.div
                className="mt-2 sm:mt-3 w-px h-6 sm:h-8 bg-gradient-to-b from-gold/60 to-transparent"
                animate={{ scaleY: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Decorative gold line at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
