import { cn } from '@/lib/utils'

type ButtonBaseProps = {
  variant?: 'primary' | 'outline'
  isDark?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a'
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const baseClasses =
  'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]'

function variantClasses(variant: 'primary' | 'outline', isDark: boolean): string {
  if (variant === 'primary') {
    return isDark
      ? 'bg-white text-stone-900 hover:bg-white/90'
      : 'bg-stone-900 text-white hover:bg-stone-800'
  }
  return isDark
    ? 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5'
    : 'border border-stone-300 text-stone-700 hover:border-stone-500 hover:bg-stone-50/50'
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', isDark = true, className, children, as, ...rest } = props

  const classes = cn(baseClasses, variantClasses(variant, isDark), className)

  if (as === 'a') {
    return (
      <a className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
