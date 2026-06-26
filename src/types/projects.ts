export type ProjectCategory = 'web-app' | 'web3' | 'smart-contract' | 'other'

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
  assets?: string[]
  featured: boolean
}
