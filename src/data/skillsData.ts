// Static skill entries for the Skills section: name, category group, and proficiency (0–100)
import type { Skill } from '@/types/skills'

export const skillsData: Skill[] = [
  // Frontend Development
  { name: 'React.js', group: 'frontend', proficiency: 95 },
  { name: 'Vue', group: 'frontend', proficiency: 96 },
  { name: 'Next.js', group: 'frontend', proficiency: 90 },
  { name: 'Nuxt.js', group: 'frontend', proficiency: 95 },
  { name: 'Javascript', group: 'frontend', proficiency: 97 },
  { name: 'Typescript', group: 'frontend', proficiency: 95 },
  { name: 'HTML5', group: 'frontend', proficiency: 97 },
  { name: 'CSS3', group: 'frontend', proficiency: 97 },
  { name: 'SCSS', group: 'frontend', proficiency: 97 },
  { name: 'Tailwind', group: 'frontend', proficiency: 94 },
  { name: 'Vuetify', group: 'frontend', proficiency: 94 },
  { name: 'Three.js', group: 'frontend', proficiency: 85 },
  { name: 'GSAP', group: 'frontend', proficiency: 82 },
  { name: 'Framer Motion', group: 'frontend', proficiency: 89 },

  // Mobile Development
  { name: 'React Native', group: 'mobile', proficiency: 90 },
  { name: 'Expo', group: 'mobile', proficiency: 90 },
  { name: 'NativeWind', group: 'mobile', proficiency: 94 },

  // Backend Development
  { name: 'Node.js', group: 'backend', proficiency: 95 },
  { name: 'Nest.js', group: 'backend', proficiency: 90 },
  { name: 'Express.js', group: 'backend', proficiency: 95 },
  { name: 'Hono', group: 'backend', proficiency: 90 },
  { name: 'PHP', group: 'backend', proficiency: 90 },
  { name: 'Codeigniter', group: 'backend', proficiency: 90 },
  { name: 'Firebase', group: 'backend', proficiency: 90 },
  { name: 'Supabase', group: 'backend', proficiency: 95 },
  { name: 'REST APIs', group: 'backend', proficiency: 95 },
  { name: 'JWT Auth', group: 'backend', proficiency: 95 },
  { name: 'Zod', group: 'backend', proficiency: 97 },

  // Databases
  { name: 'MySQL', group: 'databases', proficiency: 90 },
  { name: 'PostgreSQL', group: 'databases', proficiency: 90 },
  { name: 'Redis', group: 'databases', proficiency: 90 },
  { name: 'Weaviate', group: 'databases', proficiency: 85 },

  // Blockchain & Web3
  { name: 'Solidity', group: 'blockchain', proficiency: 97 },
  { name: 'Hardhat', group: 'blockchain', proficiency: 95 },
  { name: 'Remix', group: 'blockchain', proficiency: 97 },
  { name: 'Ethers.js', group: 'blockchain', proficiency: 97 },
  { name: 'Web3.js', group: 'blockchain', proficiency: 97 },
  { name: 'Viem', group: 'blockchain', proficiency: 97 },
  { name: 'LayerZero', group: 'blockchain', proficiency: 85 },
  { name: 'Ganache', group: 'blockchain', proficiency: 90 },
  { name: 'Ethereum', group: 'blockchain', proficiency: 95 },
  { name: 'Polygon', group: 'blockchain', proficiency: 95 },
  { name: 'Solana', group: 'blockchain', proficiency: 80 },

  // Testing
  { name: 'Jest', group: 'testing', proficiency: 98 },
  { name: 'Mocha', group: 'testing', proficiency: 98 },

  // Build, Deployment & Tooling
  { name: 'Git', group: 'build', proficiency: 97 },
  { name: 'Github', group: 'build', proficiency: 97 },
  { name: 'Bitbucket', group: 'build', proficiency: 97 },
  { name: 'Docker', group: 'build', proficiency: 80 },
  { name: 'CI/CD Pipelines', group: 'build', proficiency: 75 },
  { name: 'Vite', group: 'build', proficiency: 89 },
  { name: 'Webpack', group: 'build', proficiency: 89 },
  { name: 'Eslint', group: 'build', proficiency: 89 },
  { name: 'npm', group: 'build', proficiency: 97 },
  { name: 'yarn', group: 'build', proficiency: 97 },

  // State Management
  { name: 'Pinia', group: 'state', proficiency: 97 },
  { name: 'Zustand', group: 'state', proficiency: 80 },
  { name: 'Tanstack Query', group: 'state', proficiency: 75 },

  // Professional Skills
  { name: 'Agile Dev', group: 'professional', proficiency: 90 },
  { name: 'Collaboration', group: 'professional', proficiency: 98 },
  { name: 'API Design', group: 'professional', proficiency: 95 },
  { name: 'Code Review', group: 'professional', proficiency: 98 },
  { name: 'Perf. Optimization', group: 'professional', proficiency: 98 },

  // AI Engineering
  { name: 'LangChain', group: 'ai', proficiency: 72 },
  { name: 'LangGraph', group: 'ai', proficiency: 70 },
  { name: 'RAG', group: 'ai', proficiency: 70 },
  { name: 'Context Engineering', group: 'ai', proficiency: 85 },

  // AI Tools
  { name: 'Claude Code', group: 'aitools', proficiency: 85 },
  { name: 'Windsurf', group: 'aitools', proficiency: 90 },
]
