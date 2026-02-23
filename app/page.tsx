import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://recepcelik.dev"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore projects, technical approach, and contact details of Recep Celik, a backend-focused Mathematics Engineering student.",
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Recep Celik",
        url: siteUrl,
        jobTitle: "Backend Developer",
        alumniOf: "Mathematics Engineering",
        sameAs: [
          "https://github.com/RecepCelik1",
          "https://www.linkedin.com/in/recep-celik-/",
        ],
      },
      {
        "@type": "WebSite",
        name: "Recep Celik Portfolio",
        url: siteUrl,
        description:
          "Portfolio website presenting backend engineering projects and contact details.",
      },
    ],
  }

  return (
    <main className="grid-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <HeroSection />

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <AboutSection />

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <ProjectsSection />

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <ContactSection />
      <Footer />
    </main>
  )
}
