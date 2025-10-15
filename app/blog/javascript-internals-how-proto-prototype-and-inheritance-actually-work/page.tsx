import { Metadata } from 'next'
import { BLOG_POSTS } from '../../data'

const currentPost = BLOG_POSTS.find(post =>
    post.link === '/blog/javascript-internals-how-proto-prototype-and-inheritance-actually-work'
)

export async function generateMetadata(): Promise<Metadata> {
    if (!currentPost) {
        return {
            title: 'Blog Post Not Found'
        }
    }

    const baseUrl = 'https://shejan.me'
    const fullUrl = `${baseUrl}${currentPost.link}`
    const authorName = 'Shejan Mahamud'
    const siteName = 'Shejan Mahamud - Blog'

    const title = currentPost.title
    const description = currentPost.description
    const thumbnail = currentPost.thumbnail ? `${baseUrl}${currentPost.thumbnail}` : `${baseUrl}/cover.jpg`
    const tags = currentPost.tags || ['Blog', 'Web Development']
    const language = currentPost.language || 'en'

    return {
        title: `${title} | ${siteName}`,
        description: description,
        keywords: tags.join(', '),
        authors: [{ name: authorName, url: baseUrl }],
        creator: authorName,
        publisher: authorName,
        robots: 'index, follow',
        alternates: {
            canonical: fullUrl,
            languages: {
                [language === 'bn' ? 'bn-BD' : 'en-US']: fullUrl,
            },
        },
        openGraph: {
            type: 'article',
            title: title,
            description: description,
            url: fullUrl,
            siteName: siteName,
            images: [
                {
                    url: thumbnail,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: language === 'bn' ? 'bn_BD' : 'en_US',
            publishedTime: '2024-10-16T00:00:00.000Z',
            modifiedTime: new Date().toISOString(),
            authors: [authorName],
            section: 'Technology',
            tags: tags,
        },
        twitter: {
            card: 'summary_large_image',
            site: '@dev_shejan',
            creator: '@dev_shejan',
            title: title,
            description: description,
            images: [thumbnail],
        },
        other: {
            'article:author': authorName,
            'article:published_time': '2024-10-16T00:00:00.000Z',
            'article:modified_time': new Date().toISOString(),
            'article:section': 'Technology',
            'article:tag': tags.join(', '),
        },
    }
}

// Export the page component that renders the MDX content
export { default } from './page.mdx'
