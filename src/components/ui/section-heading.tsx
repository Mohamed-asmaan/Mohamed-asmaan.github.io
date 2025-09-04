import { clsx } from 'clsx'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function SectionHeading({ children, className, as: Component = 'h2' }: SectionHeadingProps) {
  return (
    <Component
      className={clsx(
        'text-3xl font-bold tracking-tight sm:text-4xl',
        className
      )}
    >
      {children}
    </Component>
  )
}
