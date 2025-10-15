import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '../../data'

interface BlogPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const currentPost = BLOG_POSTS.find(post =>
        post.link === `/blog/${params.slug}`
    )

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
            publishedTime: new Date().toISOString(),
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
            'article:published_time': new Date().toISOString(),
            'article:modified_time': new Date().toISOString(),
            'article:section': 'Technology',
            'article:tag': tags.join(', '),
        },
    }
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.link.split('/').pop() || '',
    }))
}

export default function BlogPage({ params }: BlogPageProps) {
    const currentPost = BLOG_POSTS.find(post =>
        post.link === `/blog/${params.slug}`
    )

    if (!currentPost) {
        notFound()
    }

    // Structured data for better SEO
    const baseUrl = 'https://shejan.me'
    const fullUrl = `${baseUrl}${currentPost.link}`
    const authorName = 'Shejan Mahamud'
    const thumbnail = currentPost.thumbnail ? `${baseUrl}${currentPost.thumbnail}` : `${baseUrl}/cover.jpg`

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": currentPost.title,
        "description": currentPost.description,
        "image": thumbnail,
        "author": {
            "@type": "Person",
            "name": authorName,
            "url": baseUrl,
            "sameAs": [
                "https://github.com/ShejanMahamud",
                "https://twitter.com/dev_shejan",
                "https://www.linkedin.com/in/md-shejanmahamud"
            ]
        },
        "publisher": {
            "@type": "Person",
            "name": authorName,
            "url": baseUrl
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "url": fullUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        },
        "keywords": currentPost.tags.join(', '),
        "articleSection": "Technology",
        "inLanguage": currentPost.language
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div>
                {/* This will be wrapped by the layout */}
                {/* The actual blog content will be handled by the MDX files */}
            </div>
        </>
    )
}
