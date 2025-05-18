"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import type { JSX } from "react/jsx-runtime"

export default function Confetti() {
  const [particles, setParticles] = useState<JSX.Element[]>([])
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  useEffect(() => {
    // Create confetti particles
    const colors = isDarkTheme
      ? ["#ff79c6", "#bd93f9", "#8be9fd", "#50fa7b", "#ffb86c", "#ff5555"]
      : ["#ff79c6", "#bd93f9", "#8be9fd", "#50fa7b", "#ffb86c", "#ff5555"]

    const newParticles = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      const left = Math.random() * 100
      const animationDelay = Math.random() * 5
      const size = Math.floor(Math.random() * 8) + 6 // 6-14px
      const color = colors[Math.floor(Math.random() * colors.length)]

      newParticles.push(
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            left: `${left}%`,
            top: "-5%",
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `fall 10s linear ${animationDelay}s infinite`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />,
      )
    }

    setParticles(newParticles)

    // Add keyframes for the fall animation
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = `
      @keyframes fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [isDarkTheme])

  return <>{particles}</>
}
