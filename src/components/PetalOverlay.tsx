"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
}

export default function PetalOverlay() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(245, 199, 169, 0.6)",
      "rgba(255, 220, 200, 0.5)",
      "rgba(212, 160, 160, 0.4)",
      "rgba(232, 216, 200, 0.5)",
      "rgba(201, 168, 76, 0.3)",
    ];
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50% 0 50% 50%",
            background: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
