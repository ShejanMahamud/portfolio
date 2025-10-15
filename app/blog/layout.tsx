'use client'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TextEffect } from '@/components/ui/text-effect'
import { TextMorph } from '@/components/ui/text-morph'
import { generateBreadcrumbStructuredData, generateStructuredData, getBlogSEOData } from '@/lib/blog-seo'
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BLOG_POSTS } from '../data'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  const handleCopy = () => {
    // Get the full URL including the pathname
    const fullUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${pathname}`
      : ''

    setText('Copied')
    navigator.clipboard.writeText(fullUrl)
  }

  return (
    <button
      onClick={handleCopy}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Find the blog post by matching the pathname
  const currentPost = BLOG_POSTS.find(post => pathname === post.link)
  const isBengali = currentPost?.language === 'bn'

  // Get SEO data using utility function
  const seoData = getBlogSEOData(pathname)

  // Fallback values for when post is not found
  const title = seoData?.title || 'Blog Post'
  const description = seoData?.description || 'A blog post about web development'
  const thumbnail = seoData?.thumbnail || 'https://shejan.me/cover.jpg'
  const tags = seoData?.tags || ['Blog', 'Web Development']
  const language = seoData?.language || 'en'
  const fullUrl = seoData?.url || `https://shejan.me${pathname}`
  const authorName = seoData?.author || 'Shejan Mahamud'

  // Generate structured data
  const structuredData = seoData ? generateStructuredData(seoData) : null
  const breadcrumbData = seoData ? generateBreadcrumbStructuredData(seoData) : null

  // Update document head dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Update title
      document.title = `${title} | Shejan Mahamud - Blog`

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string, isProperty?: boolean) => {
        const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
        let meta = document.querySelector(selector) as HTMLMetaElement
        if (!meta) {
          meta = document.createElement('meta')
          if (isProperty) {
            meta.setAttribute('property', name)
          } else {
            meta.setAttribute('name', name)
          }
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', content)
      }

      // Basic meta tags
      updateMetaTag('description', description)
      updateMetaTag('keywords', tags.join(', '))
      updateMetaTag('author', authorName)
      updateMetaTag('robots', 'index, follow')

      // Open Graph tags
      updateMetaTag('og:type', 'article', true)
      updateMetaTag('og:title', title, true)
      updateMetaTag('og:description', description, true)
      updateMetaTag('og:image', thumbnail, true)
      updateMetaTag('og:url', fullUrl, true)
      updateMetaTag('og:site_name', 'Shejan Mahamud - Blog', true)
      updateMetaTag('og:locale', language === 'bn' ? 'bn_BD' : 'en_US', true)

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image')
      updateMetaTag('twitter:site', '@dev_shejan')
      updateMetaTag('twitter:creator', '@dev_shejan')
      updateMetaTag('twitter:title', title)
      updateMetaTag('twitter:description', description)
      updateMetaTag('twitter:image', thumbnail)

      // Article specific tags
      updateMetaTag('article:author', authorName, true)
      updateMetaTag('article:published_time', seoData?.publishedTime || new Date().toISOString(), true)
      updateMetaTag('article:section', 'Technology', true)

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', fullUrl)

      // Add structured data for blog post
      if (structuredData) {
        let structuredDataScript = document.querySelector('script[type="application/ld+json"][data-type="blog-post"]')
        if (!structuredDataScript) {
          structuredDataScript = document.createElement('script')
          structuredDataScript.setAttribute('type', 'application/ld+json')
          structuredDataScript.setAttribute('data-type', 'blog-post')
          document.head.appendChild(structuredDataScript)
        }
        structuredDataScript.textContent = JSON.stringify(structuredData)
      }

      // Add breadcrumb structured data
      if (breadcrumbData) {
        let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]')
        if (!breadcrumbScript) {
          breadcrumbScript = document.createElement('script')
          breadcrumbScript.setAttribute('type', 'application/ld+json')
          breadcrumbScript.setAttribute('data-type', 'breadcrumb')
          document.head.appendChild(breadcrumbScript)
        }
        breadcrumbScript.textContent = JSON.stringify(breadcrumbData)
      }
    }
  }, [title, description, thumbnail, tags, language, fullUrl, authorName, seoData, structuredData, breadcrumbData])

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="absolute right-4 top-24">
        <CopyButton />
      </div>
      <article className={`mt-24 pb-20 tracking-wide ${isBengali ? 'font-[family-name:var(--font-hindi-siliguri)] text-lg leading-relaxed' : 'leading-relaxed'}`}>
        {children}
      </article>
      <div className='mt-12 flex items-center flex-col justify-center'>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Share this post on
        </TextEffect>
        <div className='flex items-center justify-center gap-4 mt-4'>
          <TwitterShareButton
            url={fullUrl}
            title={title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={fullUrl}
            quote={`${title} - ${description}`}
            hashtag={tags.length > 0 ? tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') : '#blog'}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <RedditShareButton
            url={fullUrl}
            title={title}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </div>
    </>
  )
}
