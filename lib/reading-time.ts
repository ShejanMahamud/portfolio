export function calculateReadingTime(content: string): number {
    // Remove HTML tags and MDX components
    const textOnly = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]*`/g, '') // Remove inline code
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just text
        .replace(/[#*_~`]/g, '') // Remove markdown formatting
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()

    // Count words (split by whitespace and filter out empty strings)
    const words = textOnly.split(/\s+/).filter(word => word.length > 0)

    // Average reading speed is 200-250 words per minute
    // Using 200 WPM for a conservative estimate
    const wordsPerMinute = 200
    const readingTime = Math.max(1, Math.ceil(words.length / wordsPerMinute))

    return readingTime
}
