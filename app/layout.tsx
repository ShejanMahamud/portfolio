import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono, Hind_Siliguri } from 'next/font/google'
import { Footer } from './footer'
import './globals.css'
import { Header } from './header'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://shejan.me'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Shejan Mahamud - Full Stack Developer',
    template: '%s | Shejan Mahamud'
  },
  description: 'Shejan Mahamud is a full stack engineer specializing in building modern web applications and saas products. Expert in React, Next.js, TypeScript, Node.js, and cloud technologies.',
  keywords: ['Shejan Mahamud', 'Full Stack Developer', 'React Developer', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Web Development', 'Frontend', 'Backend', 'Software Developer'],
  authors: [{ name: 'Shejan Mahamud', url: 'https://shejan.me' }],
  creator: 'Shejan Mahamud',
  publisher: 'Shejan Mahamud',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shejan.me',
    siteName: 'Shejan Mahamud - Portfolio',
    title: 'Shejan Mahamud - Full Stack Developer',
    description: 'Full stack engineer specializing in building modern web applications and saas products. Expert in React, Next.js, TypeScript, and cloud technologies.',
    images: [
      {
        url: 'https://shejan.me/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Shejan Mahamud - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dev_shejan',
    creator: '@dev_shejan',
    title: 'Shejan Mahamud - Full Stack Developer',
    description: 'Full stack engineer specializing in building modern web applications and saas products.',
    images: ['https://shejan.me/cover.jpg'],
  },
  verification: {
    google: "3Uo2rHeyg0UJi1X0oGso5LVdZwhOTX5BSzjBudkCUrE",
  },
  other: {
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const hindiSiliguri = Hind_Siliguri({
  variable: '--font-hindi-siliguri',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shejan Mahamud",
    "url": "https://shejan.me",
    "image": "https://shejan.me/cover.png",
    "jobTitle": "Full Stack Developer",
    "description": "Full stack engineer specializing in building modern web applications and saas products. Expert in React, Next.js, TypeScript, Node.js, and cloud technologies.",
    "email": "dev.shejanmahamud@gmail.com",
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Software Engineering",
      "Full Stack Development"
    ],
    "sameAs": [
      "https://github.com/ShejanMahamud",
      "https://twitter.com/dev_shejan",
      "https://www.linkedin.com/in/md-shejanmahamud",
      "https://www.instagram.com/shejanmahamud.me"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Johuniq",
      "url": "https://johuniq.xyz"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "University of the People"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Bangladesh"
      },
      "skills": [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Web Development",
        "Software Engineering"
      ]
    }
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shejan Mahamud - Portfolio",
    "url": "https://shejan.me",
    "description": "Personal portfolio and blog of Shejan Mahamud, a full stack engineer specializing in modern web applications.",
    "author": {
      "@type": "Person",
      "name": "Shejan Mahamud"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": "Shejan Mahamud"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="3Uo2rHeyg0UJi1X0oGso5LVdZwhOTX5BSzjBudkCUrE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${hindiSiliguri.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-md flex-1 px-8 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
