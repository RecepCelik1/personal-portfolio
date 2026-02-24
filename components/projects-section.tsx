"use client"

import { useEffect, useRef, useState } from "react"

function useInView(threshold = 0.15) {
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

const projects = [
  {
    id: "PRJ-001",
    title: "Co-Founder & Backend Developer | B2B SaaS Startup",
    status: "ARCHIVED",
    statusColor: "text-neon-red",
    description:
      "Full-stack SaaS startup built with MongoDB, Express, React, Node.js. Handled authentication, payments, and real-time data. Valuable failure — sharpened system design and resilience.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Redux", "JWT"],
    year: "2023",
    githubUrl: "https://github.com/RecepCelik1/company-os",
  },
{
  id: "PRJ-002",
  title: "Oceanwaves Maritime | Freelance",
  status: "COMPLETE",
  statusColor: "text-primary",
  description:
    "Developed a production-ready web platform and administrative dashboard for a global maritime turbocharger supplier, focusing on scalable backend architecture, secure authentication, and cloud deployment.",
  tags: [
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "Next.js",
    "JWT",
    "Docker",
    "Google Cloud"
  ],
  year: "2025",
  githubUrl: "https://github.com/RecepCelik1/ocean-waves",
  liveUrl: "https://www.oceanwavesms.com/",
},
{
  id: "PRJ-003",
  title: "Food Delivery Marketplace Platform",
  status: "ACTIVE",
  statusColor: "text-accent",
  description:
    "Architecting a scalable and real-time food delivery backend with a modular system design, secure authentication, and cloud-ready deployment. Focused on reliability, low-latency APIs, and maintainable architecture.",
  tags: [
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Socket.io",
    "Prisma",
    "JWT",
    "Docker",
    "Google Cloud"
  ],
  year: "2026",
  githubUrl: "https://github.com/RecepCelik1/yiyo-refactor",
},
]

export function ProjectsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            02
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            PROJECTS
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group border border-border hover:border-primary/30 transition-all duration-500 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Project header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.id}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <span className={`font-mono text-xs ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              {/* Project body */}
              <div className="px-5 py-5">
                <h3 className="font-sans text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-secondary-foreground leading-relaxed mb-4 max-w-2xl">
                  {project.description}
                </p>

                <div className="mb-4 flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-primary hover:text-foreground transition-colors"
                  >
                    [GITHUB]
                  </a>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:text-foreground transition-colors"
                    >
                      [LIVE]
                    </a>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 border border-border text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
