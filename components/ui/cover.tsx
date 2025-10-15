import Image from 'next/image'

interface CoverProps {
    src: string
    alt: string
    caption?: string
    priority?: boolean
}

export function Cover({ src, alt, caption, priority = true }: CoverProps) {
    return (
        <figure className="mb-8 w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
