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

const traits = [
  {
    id: "ANA",
    label: "Analytical Thinking",
    description: "Breaking down complex problems into clear and manageable solutions.",
  },
  {
    id: "SYS",
    label: "System Design",
    description: "Building structured and scalable software systems that grow without breaking.",
  },
  {
    id: "SEC",
    label: "Security Awareness",
    description: "Designing applications with strong authentication and data protection in mind.",
  },
  {
    id: "REL",
    label: "Reliability",
    description: "Creating stable and maintainable systems that perform consistently under load.",
  },
  {
    id: "PRD",
    label: "Product Mindset",
    description: "Focusing not only on code, but on delivering real value to users and businesses.",
  },
  {
    id: "CLD",
    label: "Cloud-Ready",
    description: "Deploying and managing applications in modern cloud environments.",
  },
];

export function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            01
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            ABOUT
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {/* Top: bio */}
          <div
            className={`transition-all duration-700 ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg leading-relaxed text-foreground mb-6">
            Backend-focused Mathematics Engineering student building scalable systems 
            with strong architectural foundations. I care about structure, performance, 
            and long-term reliability over quick hacks.
            </p>

            <p className="text-base leading-relaxed text-secondary-foreground mb-6">
            My mindset blends mathematical discipline with practical engineering. 
            I design software like a system — modular, secure, and built to evolve. 
            Currently focused on backend architecture, cloud infrastructure, and security-oriented development.
            </p>

            {/* Coordinates / metadata */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">FIELD</span>
                <br />
                Mathematics Engineering
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">FOCUS</span>
                <br />
  Backend Systems & Architecture
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">MISSION</span>
                <br />
  Build Robust & Scalable Software
              </div>
            </div>
          </div>

          {/* Bottom: trait cards */}
          <div className="grid grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <div
                key={trait.id}
                className={`border border-border p-5 hover:border-primary/30 transition-all duration-500 ${
                  inView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-primary">
                    [{trait.id}]
                  </span>
                  <span className="font-sans text-sm font-semibold text-foreground">
                    {trait.label}
                  </span>
                </div>
                <p className="font-mono text-xs text-secondary-foreground leading-relaxed">
                  {trait.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
