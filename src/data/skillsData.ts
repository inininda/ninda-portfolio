// Static skill entries for the Skills section: name, category group, and proficiency (0–100)
import type { Skill } from '@/types/skills'

export const skillsData: Skill[] = [
  // Fullstack
  { name: 'React', group: 'fullstack', proficiency: 90 },
  { name: 'TypeScript', group: 'fullstack', proficiency: 88 },
  { name: 'Node.js', group: 'fullstack', proficiency: 80 },
  { name: 'Next.js', group: 'fullstack', proficiency: 78 },

  // Web3
  { name: 'Solidity', group: 'web3', proficiency: 82 },
  { name: 'Ethers.js', group: 'web3', proficiency: 76 },
  { name: 'Hardhat', group: 'web3', proficiency: 72 },
  { name: 'LayerZero', group: 'web3', proficiency: 68 },

  // DevOps
  { name: 'Docker', group: 'devops', proficiency: 78 },
  { name: 'GitHub Actions', group: 'devops', proficiency: 74 },
  { name: 'AWS', group: 'devops', proficiency: 70 },
  { name: 'Vercel', group: 'devops', proficiency: 82 },

  // Tools
  { name: 'Git', group: 'tools', proficiency: 90 },
  { name: 'Figma', group: 'tools', proficiency: 65 },
  { name: 'Postman', group: 'tools', proficiency: 72 },
  { name: 'VS Code', group: 'tools', proficiency: 88 },
]
