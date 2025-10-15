import { CopyCodeButton } from '@/components/ui/copy-code-button'
import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure className="my-8">
          <img src={src} alt={alt} className="rounded-xl w-full" />
          <figcaption className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            {caption}
          </figcaption>
        </figure>
      )
    },
    pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
      // Extract the code content for the copy button
      const getCodeContent = (children: any): string => {
        if (typeof children === 'string') return children
        if (children?.props?.children) {
          if (typeof children.props.children === 'string') {
            return children.props.children
          }
          if (Array.isArray(children.props.children)) {
            return children.props.children.join('')
          }
        }
        return ''
      }

      const codeContent = getCodeContent(children)

      return (
        <div className="relative my-6">
          <pre className="overflow-x-auto rounded-lg bg-zinc-800 p-4 text-sm dark:bg-zinc-900" {...props}>
            {children}
          </pre>
          {codeContent && <CopyCodeButton code={codeContent} />}
        </div>
      )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      // Only apply syntax highlighting to code blocks (inside pre), not inline code
      const isInlineCode = !props.className || !props.className.includes('language-')

      if (isInlineCode) {
        return (
          <code
            className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800"
            {...props}
          >
            {children}
          </code>
        )
      }

      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
    h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
      <h1 className="text-2xl font-bold mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
      <h2 className="text-xl font-semibold mb-3 mt-8" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
      <h3 className="text-lg font-medium mb-2 mt-6" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
      <p className="mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
      <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 italic my-4 dark:border-zinc-600" {...props}>
        {children}
      </blockquote>
    ),
    strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
  }
}
