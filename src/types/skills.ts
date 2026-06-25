export type SkillGroup = 'fullstack' | 'web3' | 'devops' | 'tools'

export interface Skill {
  name: string
  group: SkillGroup
  proficiency: number
}
