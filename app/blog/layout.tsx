'use client'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TextEffect } from '@/components/ui/text-effect'
import { TextMorph } from '@/components/ui/text-morph'
import { getBlogSEOData } from '@/lib/blog-seo'
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
  const tags = seoData?.tags || ['Blog', 'Web Development']
  const fullUrl = seoData?.url || `https://shejan.me${pathname}`

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
