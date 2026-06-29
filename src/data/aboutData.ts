// Static content for the About section: mission log journey, metrics, and tech stack skills
import type { JourneyEntry, Metric, Skill } from '@/types/about'

export const journeyData: JourneyEntry[] = [
  {
    year: '2020',
    code: 'MISSION_001',
    title: 'First Professional Launch',
    description:
      'Joined PT. Graphie Global Interaktif fresh out of university and shipped 10+ full-stack web apps across e-commerce, healthcare, and media — learned fast by shipping constantly.',
  },
  {
    year: '2021',
    code: 'MISSION_002',
    title: 'Crossed into Web3',
    description:
      'Transferred to PT. Duckie Multi Meta and built Duckie Land from scratch — 6 in-platform games, a marketplace, and my first NFT smart contract. The blockchain obsession began here.',
  },
  {
    year: '2022',
    code: 'MISSION_003',
    title: 'Production Web3 at Scale',
    description:
      'Joined Imaginary Ones and went deep — multiple NFT smart contracts contributing to $1M+ in sales, a staking platform reaching 200,000+ active wallets, and the $BUBBLE token ecosystem.',
  },
  {
    year: '2024',
    code: 'MISSION_004',
    title: 'Cross-Chain & AI Layer',
    description:
      'Built the $BUBBLE cross-chain bridge across Ethereum, Base and Solana via LayerZero, and started integrating AI — LangChain, RAG, and LLMs as first-class layers of the stack.',
  },
  {
    year: '2026',
    code: 'MISSION_005',
    title: 'Next Mission Loading',
    description:
      '5+ years in, across Web3, fullstack, and AI. Currently open to the next challenge — remote, ambitious, and ideally shipping something that matters.',
  },
]

export const metricsData: Metric[] = [
  { value: '5+', label: 'Years Active' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '200k+', label: 'Active Wallets' },
  { value: '4', label: 'Chains Deployed' },
]

export const skillsData: Skill[] = [
  // Fullstack
  { name: 'Vue.js', group: 'fullstack' },
  { name: 'React', group: 'fullstack' },
  { name: 'Nuxt', group: 'fullstack' },
  { name: 'Nest.js', group: 'fullstack' },
  { name: 'TypeScript', group: 'fullstack' },
  { name: 'Node.js', group: 'fullstack' },
  { name: 'PostgreSQL', group: 'fullstack' },
  { name: 'MySQL', group: 'fullstack' },

  // Web3
  { name: 'Solidity', group: 'web3' },
  { name: 'Ethers.js', group: 'web3' },
  { name: 'Viem', group: 'web3' },
  { name: 'Hardhat', group: 'web3' },
  { name: 'LayerZero', group: 'web3' },

  // DevOps
  { name: 'Docker', group: 'devops' },
  { name: 'Git', group: 'devops' },
  { name: 'CI/CD Pipelines', group: 'devops' },
  { name: 'Vite', group: 'devops' },
]
