export interface Metric {
  value: string
  label: string
}

export interface JourneyEntry {
  year: string
  code: string
  title: string
  description: string
}

export type SkillGroup = 'fullstack' | 'web3' | 'devops'

export interface Skill {
  name: string
  group: SkillGroup
}
