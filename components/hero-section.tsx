"use client"

import { useEffect, useState, useRef } from "react"

function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", handleMouse)

    const spacing = 60
    const dots: { x: number; y: number }[] = []

    const buildDots = () => {
      dots.length = 0
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push({ x, y })
        }
      }
    }
    buildDots()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        const dist = Math.hypot(dot.x - mouseX, dot.y - mouseY)
        const maxDist = 200
        const intensity = Math.max(0, 1 - dist / maxDist)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1 + intensity * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${0.06 + intensity * 0.3})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayed}
      <span className="animate-blink text-primary">_</span>
    </span>
  )
}

export function HeroSection() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridCanvas />

      {/* Horizontal line accents */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" aria-hidden="true" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-red/10 to-transparent" aria-hidden="true" />

      {showContent && (
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* System header */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block font-mono text-xs tracking-[0.3em] text-muted-foreground border border-border px-4 py-2">
              SYSTEM STATUS: OPERATIONAL
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-foreground mb-6">
            <span className="block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Engineering
            </span>
            <span className="block text-primary animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              the Future.
            </span>
          </h1>

          {/* Terminal subtext */}
          <div
            className="font-mono text-sm md:text-base text-secondary-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <TypewriterText
              text="Mathematics, Software, Engineering systems"
              delay={1200}
            />
          </div>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#projects"
              className="font-mono text-xs tracking-wider px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="font-mono text-xs tracking-wider px-8 py-3 border border-border text-secondary-foreground hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              ESTABLISH CONTACT
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up"
            style={{ animationDelay: "2s" }}
          >
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              SCROLL
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>
      )}
    </section>
  )
}
