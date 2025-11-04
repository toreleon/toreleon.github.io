import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://toreleon.github.io'),
  title: {
    default: "Thang Le Viet - AI Engineer | Portfolio & Blog",
    template: "%s | Thang Le Viet"
  },
  description: "AI Engineer specializing in large language models, agentic systems, and scalable ML platforms. Explore insights on AI engineering, software development, and technology innovation.",
  keywords: ["AI Engineer", "Machine Learning", "Large Language Models", "LLM", "Agentic Systems", "AI Engineering", "Software Development", "Deep Learning", "NLP", "Natural Language Processing", "Python", "PyTorch", "NextJS", "Ho Chi Minh City", "Vietnam", "Thang Le Viet"],
  authors: [{ name: "Thang Le Viet", url: "https://toreleon.github.io" }],
  creator: "Thang Le Viet",
  publisher: "Thang Le Viet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toreleon.github.io",
    title: "Thang Le Viet - AI Engineer | Portfolio & Blog",
    description: "AI Engineer specializing in large language models, agentic systems, and scalable ML platforms. Explore insights on AI engineering and technology innovation.",
    siteName: "Thang Le Viet",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thang Le Viet - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thang Le Viet - AI Engineer | Portfolio & Blog",
    description: "AI Engineer specializing in large language models, agentic systems, and scalable ML platforms.",
    images: ["/og-image.jpg"],
    creator: "@thanglv",
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
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  alternates: {
    canonical: "https://toreleon.github.io",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thang Le Viet',
    jobTitle: 'AI Engineer',
    description: 'AI Engineer specializing in large language models, agentic systems, and scalable ML platforms',
    url: 'https://toreleon.github.io',
    image: 'https://toreleon.github.io/placeholder-user.jpg',
    sameAs: [
      'https://github.com/toreleon',
      'https://linkedin.com/in/thanglv',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'Vietnam',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'FPT AI Center',
        description: 'AI4SE Lab',
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Information Technology',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ho Chi Minh City',
          addressCountry: 'Vietnam',
        },
      },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Large Language Models',
      'Natural Language Processing',
      'Multi-Agent Systems',
      'Software Engineering',
      'Python',
      'PyTorch',
      'Deep Learning',
    ],
  }

  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
