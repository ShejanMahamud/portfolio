'use client'

import { TwitterIcon } from 'next-share'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ShareQuotePopupProps {
    selectedText: string
    rect: DOMRect | null
    onClose: () => void
}

export function QuotePopup({ selectedText, rect, onClose }: ShareQuotePopupProps) {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (selectedText && rect) {
            // Small delay to ensure smooth animation
            const timer = setTimeout(() => setIsVisible(true), 50)
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false)
        }
    }, [selectedText, rect])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Close if clicked outside the popup
            if (selectedText && !((e.target as Element)?.closest('.share-popup'))) {
                onClose()
            }
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [selectedText, onClose])

    if (!selectedText || !rect) return null

    const handleTweet = () => {
        const fullUrl = typeof window !== 'undefined'
            ? `${window.location.origin}${pathname}`
            : ''

        const tweetText = `"${selectedText}"\n\n${fullUrl}`
        const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

        window.open(twitterUrl, '_blank', 'width=550,height=420')
        onClose()
    }

    // Calculate position for the popup
    const popupStyle = {
        position: 'fixed' as const,
        top: rect.top - 80, // Position above the selection (increased for two buttons)
        left: rect.left + (rect.width / 2) - 90, // Center horizontally (adjusted for wider popup)
        zIndex: 1000,
    }

    // Adjust position if popup would go off screen
    if (popupStyle.top < 10) {
        popupStyle.top = rect.bottom + 10 // Position below if no space above
    }

    if (popupStyle.left < 10) {
        popupStyle.left = 10 // Don't go off left edge
    }

    if (typeof window !== 'undefined' && popupStyle.left > window.innerWidth - 180) {
        popupStyle.left = window.innerWidth - 180 // Don't go off right edge (adjusted for wider popup)
    }

    return (
        <div
            className={`share-popup transition-all duration-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            style={popupStyle}
        >
            <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg p-2 min-w-[180px]">
                <button
                    onClick={handleTweet}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-md transition-colors w-full mb-1"
                    type="button"
                >
                    <TwitterIcon size={16} round />
                    Tweet this quote
                </button>
            </div>

            {/* Small arrow pointing to the selection */}
            <div
                className="absolute w-2 h-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 transform rotate-45"
                style={{
                    left: '50%',
                    marginLeft: '-4px',
                    bottom: rect.top > popupStyle.top ? '-4px' : 'auto',
                    top: rect.top <= popupStyle.top ? '-4px' : 'auto',
                }}
            />
        </div>
    )
}
