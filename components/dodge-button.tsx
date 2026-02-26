"use client"

import { useCallback, useRef, useState } from "react"

export function DodgeButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dodgeCount, setDodgeCount] = useState(0)

  const dodge = useCallback(() => {
    setDodgeCount((c) => c + 1)
    const maxDist = 200 + dodgeCount * 30
    const angle = Math.random() * Math.PI * 2
    let newX = Math.cos(angle) * (100 + Math.random() * maxDist)
    let newY = Math.sin(angle) * (100 + Math.random() * maxDist)

    // Keep within viewport
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      const futureX = rect.left + newX
      const futureY = rect.top + newY

      if (futureX < 20 || futureX + rect.width > vw - 20) newX = -newX
      if (futureY < 20 || futureY + rect.height > vh - 20) newY = -newY
    }

    setOffset((prev) => ({
      x: prev.x + newX,
      y: prev.y + newY,
    }))
  }, [dodgeCount])

  return (
    <button
      ref={buttonRef}
      onMouseEnter={dodge}
      onTouchStart={dodge}
      onClick={(e) => e.preventDefault()}
      className="relative rounded-full bg-secondary px-8 py-4 font-mono text-sm text-secondary-foreground transition-all duration-300 ease-out hover:bg-secondary/80 md:px-12 md:py-5 md:text-base"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        zIndex: 10,
      }}
      aria-label="No - this button dodges your cursor!"
    >
      {children}
    </button>
  )
}
