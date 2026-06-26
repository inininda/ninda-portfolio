import type { SocialLink } from '@/data/socialData'

export interface ContactInfo {
  email: string
  availability: string
  socials: SocialLink[]
}
