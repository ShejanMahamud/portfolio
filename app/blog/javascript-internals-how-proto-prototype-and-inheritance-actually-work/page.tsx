import { createBlogPageMetadata } from '@/lib/blog-page-helpers'
import { generateStructuredData, getBlogSEOData } from '@/lib/blog-seo'
import BlogContent from './content.mdx'

// Generate metadata for this specific blog post
export const generateMetadata = createBlogPageMetadata('/blog/javascript-internals-how-proto-prototype-and-inheritance-actually-work')

export default function BlogPost() {
    const pathname = '/blog/javascript-internals-how-proto-prototype-and-inheritance-actually-work'
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
