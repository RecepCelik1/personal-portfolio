"use client"

import { useEffect, useRef, useState } from "react"

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

const statements = [
  {
    text: "Discipline over motivation.",
    annotation: "// consistency compounds",
  },
  {
    text: "Systems > Emotions.",
    annotation: "// trust the architecture",
  },
  {
    text: "Build. Test. Improve. Repeat.",
    annotation: "// iteration protocol",
  },
  {
    text: "Weakness is a bug. Fix it.",
    annotation: "// continuous deployment",
  },
]

export function PhilosophySection() {
  const { ref, inView } = useInView()

  return (
    <section id="philosophy" className="relative py-32 px-6">
      {/* Background accent line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2" aria-hidden="true" />

      <div className="mx-auto max-w-5xl relative" ref={ref}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            04
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            CORE DIRECTIVES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {statements.map((statement, i) => (
            <div
              key={i}
              className={`border border-border p-8 relative overflow-hidden group hover:border-primary/20 transition-all duration-500 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40" aria-hidden="true" />

              <blockquote className="font-sans text-xl md:text-2xl font-bold text-foreground mb-3 text-balance">
                {`"${statement.text}"`}
              </blockquote>
              <p className="font-mono text-xs text-primary/80">
                {statement.annotation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
