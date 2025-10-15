import { BLOG_POSTS } from "@/app/data"
import { Metadata } from "next"

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

export function generateBlogMetadata(pathname: string): Metadata {
    const seoData = getBlogSEOData(pathname)

    if (!seoData) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        }
    }

    return {
        title: seoData.title,
        description: seoData.description,
        keywords: seoData.tags,
        authors: [{ name: seoData.author, url: seoData.authorUrl }],
        creator: seoData.author,
        publisher: seoData.author,
        robots: 'index, follow',
        alternates: {
            canonical: seoData.url
        },
        openGraph: {
            type: 'article',
            locale: seoData.language === 'bn' ? 'bn_BD' : 'en_US',
            url: seoData.url,
            siteName: seoData.siteName,
            title: seoData.title,
            description: seoData.description,
            images: [
                {
                    url: seoData.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: seoData.title,
                },
            ],
            publishedTime: seoData.publishedTime,
            authors: [seoData.author],
            section: 'Technology',
            tags: seoData.tags,
        },
        twitter: {
            card: 'summary_large_image',
            site: '@dev_shejan',
            creator: '@dev_shejan',
            title: seoData.title,
            description: seoData.description,
            images: [seoData.thumbnail],
        },
        other: {
            'article:author': seoData.author,
            'article:published_time': seoData.publishedTime,
            'article:section': 'Technology',
            'article:tag': seoData.tags.join(','),
        },
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
