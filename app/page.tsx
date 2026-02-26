"use client"

import { useState } from "react"
import { DodgeButton } from "@/components/dodge-button"
import { RoseCascade } from "@/components/rose-cascade"
import { PixelHeart, PixelRose } from "@/components/pixel-rose"

type AppState = "question" | "cascade" | "final"

export default function GiftPage() {
  const [state, setState] = useState<AppState>("question")

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background">
      {/* Floating pixel hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <PixelHeart size={16 + i * 4} color="#e84393" />
          </div>
        ))}
      </div>

      {/* Question Screen */}
      {state === "question" && (
        <div className="relative z-20 flex flex-col items-center gap-10 px-4 md:gap-14">
          {/* Decorative rose */}
          <div
            className="animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <PixelRose size={80} color="#e84393" />
          </div>

          {/* Question */}
          <h1 className="text-balance text-center font-mono text-lg leading-relaxed text-foreground md:text-2xl lg:text-3xl">
            {"Do you want this gift?"}
          </h1>

          {/* Bubbles */}
          <div className="flex items-center gap-8 md:gap-16">
            {/* YES button */}
            <button
              onClick={() => setState("cascade")}
              className="rounded-full bg-primary px-8 py-4 font-mono text-sm text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-primary/40 active:scale-95 md:px-12 md:py-5 md:text-base"
            >
              YES
            </button>

            {/* NO button that dodges */}
            <DodgeButton>NO</DodgeButton>
          </div>

          <p className="mt-4 font-sans text-xs text-muted-foreground md:text-sm">
            {"(Try clicking No... I dare you)"}
          </p>
        </div>
      )}

      {/* Rose Cascade */}
      {state === "cascade" && (
        <RoseCascade onComplete={() => setState("final")} />
      )}

      {/* Final Screen */}
      {state === "final" && (
        <div className="relative z-20 flex flex-col items-center gap-8 px-4">
          {/* Big final rose */}
          <div style={{ animation: "pulse-glow 2s ease-in-out infinite" }}>
            <PixelRose size={160} color="#e84393" />
          </div>

          {/* Name with heart */}
          <div className="flex items-center gap-4">
            <h2 className="font-mono text-3xl text-primary md:text-5xl">
              Lerato
            </h2>
            <div style={{ animation: "heartbeat 1s ease-in-out infinite" }}>
              <PixelHeart size={48} color="#e84393" />
            </div>
          </div>

          <p className="mt-2 text-center font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            {"This one's for you, no matter the distance."}
          </p>

          {/* Sparkle particles */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `sparkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Restart */}
          <button
            onClick={() => setState("question")}
            className="mt-6 rounded-full border border-border bg-secondary px-6 py-2 font-sans text-xs text-secondary-foreground transition-all hover:bg-secondary/80 md:text-sm"
          >
            {"Play again"}
          </button>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(232, 67, 147, 0.3)); }
          50% { filter: drop-shadow(0 0 24px rgba(232, 67, 147, 0.6)); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  )
}
