// Static content for the About section: mission log journey, metrics, and tech stack skills
import type { JourneyEntry, Metric, Skill } from '@/types/about'

export const journeyData: JourneyEntry[] = [
  {
    year: '2019',
    code: 'MISSION_001',
    title: 'First Line of Code',
    description:
      'Wrote my first line of PHP and immediately broke the database. No regrets — the obsession started here.',
  },
  {
    year: '2021',
    code: 'MISSION_002',
    title: 'Gone Fullstack',
    description:
      'React and Node.js entered the stack. Shipped first production app to real users and survived the launch.',
  },
  {
    year: '2022',
    code: 'MISSION_003',
    title: 'First SaaS Shipped',
    description:
      'Built and launched a SaaS product from zero — handled design, backend, infra, and everything in between.',
  },
  {
    year: '2023',
    code: 'MISSION_004',
    title: 'Crossed into Web3',
    description:
      'Deployed first smart contract on mainnet. Solidity, LayerZero, and on-chain state became the new frontier.',
  },
  {
    year: '2025',
    code: 'MISSION_005',
    title: 'AI-Native Engineering',
    description:
      'Integrated LLMs into the core of products — not as a gimmick, but as a first-class layer of the stack.',
  },
]


export const metricsData: Metric[] = [
  { value: '5+', label: 'Years Active' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '12', label: 'Clients Served' },
  { value: '3', label: 'Chains Deployed' },
]

export const skillsData: Skill[] = [
  // Fullstack
  { name: 'React', group: 'fullstack' },
  { name: 'TypeScript', group: 'fullstack' },
  { name: 'Node.js', group: 'fullstack' },
  { name: 'PostgreSQL', group: 'fullstack' },
  { name: 'Next.js', group: 'fullstack' },

  // Web3
  { name: 'Solidity', group: 'web3' },
  { name: 'Ethers.js', group: 'web3' },
  { name: 'Hardhat', group: 'web3' },
  { name: 'LayerZero', group: 'web3' },
  { name: 'The Graph', group: 'web3' },

  // DevOps
  { name: 'Docker', group: 'devops' },
  { name: 'GitHub Actions', group: 'devops' },
  { name: 'AWS', group: 'devops' },
  { name: 'Vercel', group: 'devops' },
  { name: 'Terraform', group: 'devops' },
]
