'use client'

import { useEffect, useState } from 'react'

export function useReadingTime(pathname: string) {
    const [readingTime, setReadingTime] = useState<number>(1)

    useEffect(() => {
        const calculateReadingTime = () => {
            // Get the article content from the DOM
            const article = document.querySelector('article')
            if (!article) return 1

            // Extract text content, excluding code blocks and other non-readable elements
            const textContent = article.innerText || article.textContent || ''

            // Clean up the text
            const cleanText = textContent
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim()

            // Count words
            const words = cleanText.split(/\s+/).filter(word => word.length > 0)

            // Average reading speed: 200 words per minute
            const wordsPerMinute = 200
            const time = Math.max(1, Math.ceil(words.length / wordsPerMinute))

            setReadingTime(time)
        }

        // Calculate after a small delay to ensure content is rendered
        const timer = setTimeout(calculateReadingTime, 500)

        return () => clearTimeout(timer)
    }, [pathname])

    return readingTime
}
