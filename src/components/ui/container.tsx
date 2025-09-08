import { clsx } from 'clsx'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component
      className={clsx(
        // Industry standard: 1100px max-width with responsive padding
        'mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  )
}
