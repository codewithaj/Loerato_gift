"use client"

export function PixelRose({ size = 64, color = "#e84393" }: { size?: number; color?: string }) {
  const px = size / 16

  // Pixel art rose pattern (16x16 grid)
  const pixels = [
    // Stem and leaves (green)
    { x: 7, y: 12, c: "#27ae60" }, { x: 8, y: 12, c: "#27ae60" },
    { x: 7, y: 13, c: "#27ae60" }, { x: 8, y: 13, c: "#27ae60" },
    { x: 7, y: 14, c: "#2ecc71" }, { x: 8, y: 14, c: "#2ecc71" },
    { x: 7, y: 15, c: "#2ecc71" }, { x: 8, y: 15, c: "#2ecc71" },
    { x: 5, y: 13, c: "#2ecc71" }, { x: 6, y: 13, c: "#27ae60" },
    { x: 9, y: 14, c: "#27ae60" }, { x: 10, y: 14, c: "#2ecc71" },
    // Rose petals outer
    { x: 5, y: 3, c: color }, { x: 6, y: 3, c: color }, { x: 7, y: 3, c: color },
    { x: 8, y: 3, c: color }, { x: 9, y: 3, c: color }, { x: 10, y: 3, c: color },
    { x: 4, y: 4, c: color }, { x: 11, y: 4, c: color },
    { x: 3, y: 5, c: color }, { x: 12, y: 5, c: color },
    { x: 3, y: 6, c: color }, { x: 12, y: 6, c: color },
    { x: 3, y: 7, c: color }, { x: 12, y: 7, c: color },
    { x: 3, y: 8, c: color }, { x: 12, y: 8, c: color },
    { x: 4, y: 9, c: color }, { x: 11, y: 9, c: color },
    { x: 5, y: 10, c: color }, { x: 6, y: 10, c: color }, { x: 7, y: 10, c: color },
    { x: 8, y: 10, c: color }, { x: 9, y: 10, c: color }, { x: 10, y: 10, c: color },
    { x: 5, y: 11, c: color }, { x: 10, y: 11, c: color },
    // Rose petals inner (lighter)
    { x: 5, y: 4, c: adjustBrightness(color, 30) }, { x: 6, y: 4, c: adjustBrightness(color, 30) },
    { x: 7, y: 4, c: adjustBrightness(color, 20) }, { x: 8, y: 4, c: adjustBrightness(color, 20) },
    { x: 9, y: 4, c: adjustBrightness(color, 30) }, { x: 10, y: 4, c: adjustBrightness(color, 30) },
    { x: 4, y: 5, c: adjustBrightness(color, 20) }, { x: 5, y: 5, c: adjustBrightness(color, 40) },
    { x: 6, y: 5, c: adjustBrightness(color, 50) }, { x: 7, y: 5, c: adjustBrightness(color, 40) },
    { x: 8, y: 5, c: adjustBrightness(color, 40) }, { x: 9, y: 5, c: adjustBrightness(color, 50) },
    { x: 10, y: 5, c: adjustBrightness(color, 40) }, { x: 11, y: 5, c: adjustBrightness(color, 20) },
    { x: 4, y: 6, c: adjustBrightness(color, 20) }, { x: 5, y: 6, c: adjustBrightness(color, 30) },
    { x: 6, y: 6, c: adjustBrightness(color, 50) }, { x: 7, y: 6, c: color },
    { x: 8, y: 6, c: color }, { x: 9, y: 6, c: adjustBrightness(color, 50) },
    { x: 10, y: 6, c: adjustBrightness(color, 30) }, { x: 11, y: 6, c: adjustBrightness(color, 20) },
    { x: 4, y: 7, c: adjustBrightness(color, 20) }, { x: 5, y: 7, c: adjustBrightness(color, 40) },
    { x: 6, y: 7, c: adjustBrightness(color, 30) }, { x: 7, y: 7, c: adjustBrightness(color, 40) },
    { x: 8, y: 7, c: adjustBrightness(color, 40) }, { x: 9, y: 7, c: adjustBrightness(color, 30) },
    { x: 10, y: 7, c: adjustBrightness(color, 40) }, { x: 11, y: 7, c: adjustBrightness(color, 20) },
    { x: 4, y: 8, c: adjustBrightness(color, 20) }, { x: 5, y: 8, c: adjustBrightness(color, 30) },
    { x: 6, y: 8, c: adjustBrightness(color, 40) }, { x: 7, y: 8, c: adjustBrightness(color, 30) },
    { x: 8, y: 8, c: adjustBrightness(color, 30) }, { x: 9, y: 8, c: adjustBrightness(color, 40) },
    { x: 10, y: 8, c: adjustBrightness(color, 30) }, { x: 11, y: 8, c: adjustBrightness(color, 20) },
    { x: 5, y: 9, c: adjustBrightness(color, 20) }, { x: 6, y: 9, c: adjustBrightness(color, 30) },
    { x: 7, y: 9, c: adjustBrightness(color, 20) }, { x: 8, y: 9, c: adjustBrightness(color, 20) },
    { x: 9, y: 9, c: adjustBrightness(color, 30) }, { x: 10, y: 9, c: adjustBrightness(color, 20) },
    { x: 6, y: 11, c: adjustBrightness(color, -20) }, { x: 7, y: 11, c: adjustBrightness(color, -20) },
    { x: 8, y: 11, c: adjustBrightness(color, -20) }, { x: 9, y: 11, c: adjustBrightness(color, -20) },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ imageRendering: "pixelated" }}
    >
      {pixels.map((p, i) => (
        <rect key={i} x={p.x * px} y={p.y * px} width={px} height={px} fill={p.c} />
      ))}
    </svg>
  )
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(2.55 * percent)))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
}

export function PixelHeart({ size = 64, color = "#e84393" }: { size?: number; color?: string }) {
  const px = size / 16

  const pixels = [
    // Left bump
    { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
    { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
    { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
    // Right bump
    { x: 11, y: 3 }, { x: 12, y: 3 }, { x: 13, y: 3 },
    { x: 10, y: 4 }, { x: 11, y: 4 }, { x: 12, y: 4 }, { x: 13, y: 4 }, { x: 14, y: 4 },
    { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 14, y: 5 },
    { x: 10, y: 6 }, { x: 11, y: 6 }, { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 },
    // Middle connection
    { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
    { x: 8, y: 3 }, { x: 9, y: 3 }, { x: 10, y: 3 },
    { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 },
    { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 },
    { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 },
    // Taper down
    { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
    { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 }, { x: 10, y: 7 },
    { x: 11, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 },
    { x: 3, y: 8 }, { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 },
    { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 },
    { x: 11, y: 8 }, { x: 12, y: 8 },
    { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 6, y: 9 },
    { x: 7, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 }, { x: 11, y: 9 },
    { x: 5, y: 10 }, { x: 6, y: 10 }, { x: 7, y: 10 },
    { x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 },
    { x: 6, y: 11 }, { x: 7, y: 11 }, { x: 8, y: 11 }, { x: 9, y: 11 },
    { x: 7, y: 12 }, { x: 8, y: 12 },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ imageRendering: "pixelated" }}
    >
      {pixels.map((p, i) => (
        <rect key={i} x={p.x * px} y={p.y * px} width={px} height={px} fill={color} />
      ))}
    </svg>
  )
}
