import { createBlogPageMetadata } from '@/lib/blog-page-helpers'
import { generateStructuredData, getBlogSEOData } from '@/lib/blog-seo'
import BlogContent from './content.mdx'

// Generate metadata for this specific blog post
export const generateMetadata = createBlogPageMetadata('/blog/javaScript-internals-global-execution-context-and-temporal-dead-zone')

export default function BlogPost() {
    const pathname = '/blog/javaScript-internals-global-execution-context-and-temporal-dead-zone'
    const seoData = getBlogSEOData(pathname)
    const structuredData = seoData ? generateStructuredData(seoData) : null

    return (
        <>
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}
            <BlogContent />
        </>
    )
}
