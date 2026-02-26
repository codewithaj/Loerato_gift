"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { PixelRose, PixelHeart } from "./pixel-rose"

interface RoseCard {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  rotation: number
}

const ROSE_COLORS = ["#e84393", "#fd79a8", "#ff6b81", "#e74c3c", "#c0392b", "#ff4757", "#f78fb3"]

export function RoseCascade({ onComplete }: { onComplete: () => void }) {
  const [cards, setCards] = useState<RoseCard[]>([])
  const [showFinal, setShowFinal] = useState(false)
  const [phase, setPhase] = useState(0) // 0 = cascading, 1 = final card
  const containerRef = useRef<HTMLDivElement>(null)
  const completeCalled = useRef(false)

  const generateCards = useCallback(() => {
    const newCards: RoseCard[] = []
    const total = 18

    for (let i = 0; i < total; i++) {
      newCards.push({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 70,
        size: 48 + Math.random() * 48,
        color: ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)],
        delay: i * 150,
        rotation: -30 + Math.random() * 60,
      })
    }
    return newCards
  }, [])

  useEffect(() => {
    const newCards = generateCards()
    setCards(newCards)

    const cascadeTime = newCards.length * 150 + 800
    const timer1 = setTimeout(() => {
      setPhase(1)
      setShowFinal(true)
    }, cascadeTime)

    const timer2 = setTimeout(() => {
      if (!completeCalled.current) {
        completeCalled.current = true
        onComplete()
      }
    }, cascadeTime + 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [generateCards, onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-background/90"
      style={{ backdropFilter: "blur(4px)" }}
    >
      {/* Pac-Man mouth opening animation for each rose */}
      {cards.map((card) => (
        <div
          key={card.id}
          className="absolute"
          style={{
            left: `${card.x}%`,
            top: `${card.y}%`,
            transform: `translate(-50%, -50%) rotate(${card.rotation}deg)`,
            animation: `pacman-pop 0.5s ease-out ${card.delay}ms both`,
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl border border-border bg-card p-3 shadow-lg shadow-primary/20"
            style={{ width: card.size + 24, height: card.size + 24 }}
          >
            <PixelRose size={card.size} color={card.color} />
          </div>
        </div>
      ))}

      {/* Final big card */}
      {showFinal && phase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex flex-col items-center gap-4 rounded-2xl border-2 border-primary bg-card p-8 shadow-2xl shadow-primary/30 md:gap-6 md:p-12"
            style={{ animation: "final-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both" }}
          >
            <PixelRose size={120} color="#e84393" />
            <div className="flex items-center gap-3 md:gap-4">
              <span className="font-mono text-lg text-primary md:text-2xl">Lerato</span>
              <PixelHeart size={32} color="#e84393" />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pacman-pop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            clip-path: polygon(50% 50%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
          }
          30% {
            opacity: 1;
            clip-path: polygon(50% 50%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 50%);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(var(--rotation, 0deg));
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0% 0%);
          }
        }
        @keyframes final-pop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-10deg);
          }
          60% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  )
}
