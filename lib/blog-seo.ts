import { BLOG_POSTS } from "@/app/data"

export interface BlogSEOData {
    title: string
    description: string
    url: string
    thumbnail: string
    tags: string[]
    language: string
    publishedTime: string
    modifiedTime: string
    author: string
    authorUrl: string
    siteName: string
    baseUrl: string
}

export function getBlogSEOData(pathname: string): BlogSEOData | null {
    const currentPost = BLOG_POSTS.find(post => post.link === pathname)

    if (!currentPost) {
        return null
    }

    const baseUrl = 'https://shejan.me'
    const fullUrl = `${baseUrl}${currentPost.link}`
    const authorName = 'Shejan Mahamud'
    const authorUrl = baseUrl
    const siteName = 'Shejan Mahamud - Blog'

    return {
        title: currentPost.title,
        description: currentPost.description,
        url: fullUrl,
        thumbnail: currentPost.thumbnail ? `${baseUrl}${currentPost.thumbnail}` : `${baseUrl}/cover.jpg`,
        tags: currentPost.tags || ['Blog', 'Web Development'],
        language: currentPost.language || 'en',
        publishedTime: '2024-10-16T00:00:00.000Z', // This should ideally come from the blog post data
        modifiedTime: new Date().toISOString(),
        author: authorName,
        authorUrl: authorUrl,
        siteName: siteName,
        baseUrl: baseUrl
    }
}

export function generateStructuredData(seoData: BlogSEOData) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": seoData.title,
        "description": seoData.description,
        "image": seoData.thumbnail,
        "author": {
            "@type": "Person",
            "name": seoData.author,
            "url": seoData.authorUrl,
            "sameAs": [
                "https://github.com/ShejanMahamud",
                "https://twitter.com/dev_shejan",
                "https://www.linkedin.com/in/md-shejanmahamud"
            ]
        },
        "publisher": {
            "@type": "Person",
            "name": seoData.author,
            "url": seoData.authorUrl
        },
        "datePublished": seoData.publishedTime,
        "dateModified": seoData.modifiedTime,
        "url": seoData.url,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": seoData.url
        },
        "keywords": seoData.tags.join(', '),
        "articleSection": "Technology",
        "inLanguage": seoData.language,
        "isPartOf": {
            "@type": "Blog",
            "name": seoData.siteName,
            "url": seoData.baseUrl
        }
    }
}

export function generateBreadcrumbStructuredData(seoData: BlogSEOData) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": seoData.baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${seoData.baseUrl}/blog`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": seoData.title,
                "item": seoData.url
            }
        ]
    }
}
