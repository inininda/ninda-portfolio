export type SkillGroup =
  | 'frontend'
  | 'mobile'
  | 'backend'
  | 'databases'
  | 'blockchain'
  | 'testing'
  | 'build'
  | 'state'
  | 'professional'
  | 'ai'
  | 'aitools'

export interface Skill {
  name: string
  group: SkillGroup
  proficiency: number
}
