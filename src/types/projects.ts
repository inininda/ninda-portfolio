export type ProjectCategory = 'web-app' | 'web3' | 'smart-contract' | 'other' | 'ai'

export type ProjectStatus = 'live' | 'in-progress' | 'archived'

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory[]
  techStack: string[]
  status: ProjectStatus
  demoUrl?: string
  githubUrl?: string
  assets?: string[],
  cover?: string,
  featured: boolean
  challenges?: string[]
  achievements?: string[]
}
