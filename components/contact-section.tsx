"use client"

import { useState, useRef, useEffect } from "react"

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

const terminalLines = [
  { type: "system" as const, text: "Establishing secure channel..." },
  { type: "system" as const, text: "Connection established." },
  { type: "system" as const, text: "Ready to receive transmission." },
]

interface ContactForm {
  name: string
  surname: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const { ref, inView } = useInView()
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
  })
  const [messages, setMessages] = useState(terminalLines)
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSending) return

    const { name, surname, email, subject, message } = formData
    if (!name.trim() || !surname.trim() || !email.trim() || !subject.trim() || !message.trim()) return

    setIsSending(true)
    setMessages((prev) => [
      ...prev,
      { type: "system" as const, text: `> ${name} ${surname} | ${email} | ${subject}` },
      { type: "system" as const, text: "Sending packet to /api/form-submit..." },
    ])

    try {
      const response = await fetch("/api/form-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { type: "system" as const, text: `Transmission failed. Status: ${response.status}` },
        ])
        return
      }

      setMessages((prev) => [
        ...prev,
        { type: "system" as const, text: "Message queued. Will respond via preferred channel." },
      ])
      setFormData({
        name: "",
        surname: "",
        email: "",
        subject: "",
        message: "",
      })
      setSubmitted(true)
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "system" as const, text: "Transmission failed. Network or server is unavailable." },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            03
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            ESTABLISH CONTACT
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: contact links */}
          <div>
            <p className="font-mono text-sm text-secondary-foreground leading-relaxed mb-10">
              Open channels for collaboration, opportunities, or technical
              discussions
            </p>

            <div className="flex flex-col gap-6">
              <a
                href="mailto:celikrecep289@gmail.com"
                className="group flex items-center gap-4 font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary text-xs">{">"}</span>
                <span>celikrecep289@gmail.com</span>
              </a>

              <a
                href="https://github.com/RecepCelik1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary text-xs">{">"}</span>
                <span>github.com/RecepCelik1</span>
              </a>

              <a
                href="https://www.linkedin.com/in/recep-celik-/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 font-mono text-sm text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary text-xs">{">"}</span>
                <span>linkedin.com/in/recep-celik-</span>
              </a>
            </div>
          </div>

          {/* Right: terminal form */}
          <div className="border border-border">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
              <span className="h-2 w-2 rounded-full bg-neon-red" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-mono text-xs text-muted-foreground ml-2">
                contact --terminal
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 min-h-[200px] flex flex-col">
              <div className="flex-1 flex flex-col gap-1 mb-4">
                {messages.map((msg, i) => (
                  <p key={i} className="font-mono text-xs text-secondary-foreground">
                    <span className="text-primary">$</span> {msg.text}
                  </p>
                ))}
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-mono text-sm text-primary">{">"}</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Name"
                      className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      aria-label="Name"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-mono text-sm text-primary">{">"}</span>
                    <input
                      type="text"
                      value={formData.surname}
                      onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                      placeholder="Surname"
                      className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      aria-label="Surname"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-mono text-sm text-primary">{">"}</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Email"
                      className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      aria-label="Email"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-mono text-sm text-primary">{">"}</span>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Subject"
                      className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      aria-label="Subject"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-mono text-sm text-primary">{">"}</span>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Message"
                      className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      aria-label="Message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="self-end font-mono text-sm text-primary hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? "[SENDING...]" : "[SEND]"}
                  </button>
                </form>
              ) : (
                <p className="font-mono text-xs text-primary">
                  {">"} Transmission complete. Standing by.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
