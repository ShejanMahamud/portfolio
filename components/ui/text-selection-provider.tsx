'use client'

import { useTextSelection } from '@/hooks/useTextSelection'
import { QuotePopup } from './quote-popup'

interface TextSelectionProviderProps {
    children: React.ReactNode
}

export function TextSelectionProvider({ children }: TextSelectionProviderProps) {
    const { selection, clearSelection } = useTextSelection()

    return (
        <div className="relative">
            {children}
            <QuotePopup
                selectedText={selection.text}
                rect={selection.rect}
                onClose={clearSelection}
            />
        </div>
    )
}
