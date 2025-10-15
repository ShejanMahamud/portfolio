import { generateBlogMetadata } from '@/lib/blog-seo'
import { Metadata } from 'next'

// Export a generic function that can be used in any blog post page.tsx
export function createBlogPageMetadata(pathname: string) {
    return async function generateMetadata(): Promise<Metadata> {
        return generateBlogMetadata(pathname)
    }
}

/**
 * Usage example for a blog post page.tsx:
 * 
 * import { createBlogPageMetadata } from '@/lib/blog-page-helpers'
 * import BlogContent from './page.mdx'
 * 
 * export const generateMetadata = createBlogPageMetadata('/blog/your-blog-post-slug')
 * 
 * export default function BlogPost() {
 *   return <BlogContent />
 * }
 */
