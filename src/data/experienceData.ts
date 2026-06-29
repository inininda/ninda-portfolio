// Static work experience entries for the Experience section — ordered newest first
import type { Experience } from '@/types/experience'

export const experienceData: Experience[] = [
  {
    id: 'searching',
    role: 'Searching for Next Mission',
    company: '',
    startDate: 'Jun 2026',
    endDate: 'present',
    isSearching: true,
    stack: [],
    responsibilities: [
      'Open to fulltime and contract roles',
      'Fullstack + Web3 + AI focus',
      'Remote or hybrid',
    ],
  },
  {
    id: 'euge-holdings',
    role: 'Fullstack Developer',
    company: 'Euge Holdings Pte. Ltd.',
    companyUrl: 'https://eugeholdings.com',
    startDate: 'Mar 2026',
    endDate: 'May 2026',
    isSearching: false,
    stack: ['React', 'React Native', 'Express.js', 'PostgreSQL', 'TypeORM', 'Supabase', 'Hono', 'Deno'],
    responsibilities: [
      'Built a multi-organization payment solution and companion mobile app using React, React Native and Express.js, giving admins and payees real-time visibility into transaction status',
      'Migrated database layer from raw Supabase calls to TypeORM and led security hardening for Bubio, an AI-driven platform serving 1,000+ users',
    ],
    location: 'Singapore, Remote',
  },
  {
    id: 'imaginary-ones',
    role: 'Fullstack Web3 Developer',
    company: 'Imaginary Ones Pte. Ltd.',
    companyUrl: 'https://imaginaryones.com',
    startDate: 'Aug 2022',
    endDate: 'Feb 2026',
    isSearching: false,
    stack: ['Vue.js', 'Nuxt', 'Nest.js', 'MySQL', 'Solidity', 'Viem', 'Ethers.js', 'LayerZero', 'React', 'Hono', 'Supabase'],
    responsibilities: [
      'Delivered end-to-end across the full Imaginary Ones ecosystem — NFT smart contracts contributing to $1M+ in sales, a staking platform with 200,000+ active wallets, the $BUBBLE token and cross-chain bridge (Ethereum, Base, Solana via LayerZero), and 10,000+ played carnival games',
      'Migrated the main site from Nuxt 2 to Nuxt 3, built 5+ campaign sites, and optimized the token claim backend reducing signature generation from 30+ seconds to under 12 seconds (60%+ improvement)',
    ],
    location: 'Singapore, Remote',
  },
  {
    id: 'duckie-multi-meta',
    role: 'Backend Developer',
    company: 'PT. Duckie Multi Meta',
    startDate: 'Dec 2021',
    endDate: 'Jul 2022',
    isSearching: false,
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'jQuery', 'HTML', 'Solidity'],
    responsibilities: [
      'Solely architected and built the backend for Duckie Land and its 6 in-platform games from scratch using PHP CodeIgniter and MySQL',
      'Initiated smart contract development for the Duckie NFT collection and marketplace, marking the start of a full-time Web3 engineering path',
    ],
    location: 'Jakarta, Indonesia',
  },
  {
    id: 'graphie-global',
    role: 'Web Developer',
    company: 'PT. Graphie Global Interaktif',
    startDate: 'Sep 2020',
    endDate: 'Dec 2021',
    isSearching: false,
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'jQuery', 'HTML', 'CSS'],
    responsibilities: [
      'Designed, built and shipped 10+ full-stack web applications across e-commerce, healthcare, library systems and media using PHP CodeIgniter, MySQL and JavaScript',
      'Partnered with clients and PMs to translate requirements into technical specs, consistently delivering multiple concurrent projects on schedule',
    ],
    location: 'Jakarta, Indonesia',
  },
]
