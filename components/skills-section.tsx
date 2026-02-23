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

function SkillBar({
  label,
  level,
  delay,
  active,
}: {
  label: string
  level: number
  delay: number
  active: boolean
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-secondary-foreground w-36 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-1 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-1000 ease-out"
          style={{
            width: active ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span className="font-mono text-xs text-primary w-10">
        {active ? `${level}%` : "0%"}
      </span>
    </div>
  )
}

const skillCategories = [
  {
    title: "MATHEMATICS",
    prefix: "MTH",
    skills: [
      { label: "Linear Algebra", level: 92 },
      { label: "Calculus & Analysis", level: 88 },
      { label: "Probability & Stats", level: 85 },
      { label: "Numerical Methods", level: 80 },
    ],
  },
  {
    title: "SOFTWARE",
    prefix: "SFT",
    skills: [
      { label: "JavaScript / TS", level: 90 },
      { label: "React / Next.js", level: 85 },
      { label: "Node.js / Express", level: 82 },
      { label: "Python", level: 78 },
    ],
  },
  {
    title: "SYSTEMS",
    prefix: "SYS",
    skills: [
      { label: "System Design", level: 82 },
      { label: "Problem Decomp.", level: 90 },
      { label: "Analytical Modeling", level: 85 },
      { label: "Cybersecurity", level: 70 },
    ],
  },
]

export function SkillsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            03
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            SYSTEM DIAGNOSTICS
          </h2>
        </div>

        {/* Terminal header */}
        <div className="border border-border mb-8">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
            <span className="h-2 w-2 rounded-full bg-neon-red" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground ml-2">
              skills --diagnostics --verbose
            </span>
          </div>

          <div className="p-6">
            <div className="font-mono text-xs text-secondary-foreground mb-6">
              <span className="text-primary">{'>'}</span> Running system
              diagnostics...
              <br />
              <span className="text-primary">{'>'}</span> All subsystems
              nominal.
              <br />
              <span className="text-primary">{'>'}</span> Rendering capability
              matrix:
            </div>

            <div className="grid md:grid-cols-1 gap-10">
              {skillCategories.map((category, ci) => (
                <div
                  key={category.prefix}
                  className={`transition-all duration-700 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${ci * 200}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-primary">
                      [{category.prefix}]
                    </span>
                    <span className="font-mono text-xs tracking-widest text-foreground">
                      {category.title}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="flex flex-col gap-3 pl-4">
                    {category.skills.map((skill, si) => (
                      <SkillBar
                        key={skill.label}
                        label={skill.label}
                        level={skill.level}
                        delay={ci * 200 + si * 100}
                        active={inView}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
