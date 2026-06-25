// Social links displayed in the hero section and footer
export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

export const socialData: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/nindamawarni-euge',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nindamawarni',
    icon: 'linkedin',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/nindamawarni',
    icon: 'twitter',
  },
  {
    label: 'Email',
    href: 'mailto:mawarnininda@gmail.com',
    icon: 'email',
  },
]
