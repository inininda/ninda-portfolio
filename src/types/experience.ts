export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  startDate: string
  endDate: string | 'present'
  isSearching: boolean
  stack: string[]
  responsibilities: string[]
  location?: string
}
