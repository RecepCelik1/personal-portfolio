import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://recepcelik.dev'
const siteName = 'Recep Celik Portfolio'
const siteTitle = 'Recep Celik | Backend & Systems Engineer'
const siteDescription =
  'Backend-oriented Mathematics Engineering student building scalable systems, secure APIs, and cloud-native software.'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Recep Celik',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'Recep Celik',
    'Backend Developer',
    'Devops',
    'Systems Engineer',
    'Mathematical Engineering',
    'Applied Mathematical',
    'Next.js Portfolio',
    'NestJS',
    'Cloud Architecture',
  ],
  authors: [{ name: 'Recep Celik' }],
  creator: 'Recep Celik',
  publisher: 'Recep Celik',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: siteTitle,
    description: siteDescription,
    siteName,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Recep Celik Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/tab-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/tab-icon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    shortcut: '/tab-icon-32.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
