'use client'

import { useEffect, useState } from 'react'

export interface Selection {
    text: string
    rect: DOMRect | null
}

export function useTextSelection() {
    const [selection, setSelection] = useState<Selection>({ text: '', rect: null })

    useEffect(() => {
        const handleSelectionChange = () => {
            const sel = window.getSelection()

            if (!sel || sel.rangeCount === 0) {
                setSelection({ text: '', rect: null })
                return
            }

            const range = sel.getRangeAt(0)
            const text = sel.toString().trim()

            if (text.length === 0) {
                setSelection({ text: '', rect: null })
                return
            }

            // Get the bounding rectangle of the selection
            const rect = range.getBoundingClientRect()

            setSelection({ text, rect })
        }

        // Listen for selection changes
        document.addEventListener('selectionchange', handleSelectionChange)

        // Also listen for mouse up events to catch selection changes
        document.addEventListener('mouseup', handleSelectionChange)

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange)
            document.removeEventListener('mouseup', handleSelectionChange)
        }
    }, [])

    const clearSelection = () => {
        window.getSelection()?.removeAllRanges()
        setSelection({ text: '', rect: null })
    }

    return { selection, clearSelection }
}
