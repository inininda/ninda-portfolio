// Social links displayed in the hero section and footer
export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

export const socialData: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/inininda',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ninda-mawarni-it/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:mawarnininda@gmail.com',
    icon: 'email',
  },
]
