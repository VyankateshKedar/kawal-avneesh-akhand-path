"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpeningCard from "@/components/OpeningCard";
import PetalOverlay from "@/components/PetalOverlay";
import InvitationSection from "@/components/InvitationSection";
import RevealDate from "@/components/RevealDate";
import EventItinerary from "@/components/EventItinerary";
import SongPlayer from "@/components/SongPlayer";
// import RSVPSection from "@/components/RSVPSection";
import CountdownFooter from "@/components/CountdownFooter";

export default function Home() {
  const [showInvitation, setShowInvitation] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* Opening card overlay */}
      {!showInvitation && (
        <OpeningCard onEnter={() => setShowInvitation(true)} />
      )}

      {/* Main invitation content */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {/* Petal overlay */}
            <PetalOverlay />

            {/* Navigation dots - floating side nav */}
            <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
              {[
                { id: "invitation", label: "Invitation" },
                { id: "reveal-date", label: "Date Reveal" },
                { id: "events", label: "Events" },
                { id: "song", label: "Song" },
                { id: "rsvp", label: "RSVP" },
                { id: "footer", label: "Countdown" },
              ].map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group relative flex items-center justify-end"
                  title={section.label}
                >
                  <span className="mr-3 text-xs text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    style={{ fontFamily: "var(--font-serif-body)" }}
                  >
                    {section.label}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full border border-gold/50 bg-cream hover:bg-gold/40 hover:scale-125 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Sections */}
            <InvitationSection />

            <RevealDate />

            <EventItinerary />

            {/* Decorative section divider */}
            <div className="relative h-16 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cream via-peach-light/30 to-cream" />
              <div className="relative flex items-center gap-4">
                <div className="w-8 sm:w-16 h-px bg-gold/30" />
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gold/70 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                </div>
                <div className="w-8 sm:w-16 h-px bg-gold/30" />
              </div>
            </div>

            <SongPlayer />

            {/* Decorative section divider */}
            <div className="relative h-16 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cream via-peach-light/30 to-cream" />
              <div className="relative flex items-center gap-4">
                <div className="w-8 sm:w-16 h-px bg-gold/30" />
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gold/70 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                </div>
                <div className="w-8 sm:w-16 h-px bg-gold/30" />
              </div>
            </div>

            {/* <RSVPSection /> */}
            <CountdownFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
