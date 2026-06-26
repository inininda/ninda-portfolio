// Static project entries for the Projects section — 9 items distributed across 3 columns
import type { Project } from '@/types/projects'

export const projectsData: Project[] = [
  {
    id: 'nebula-dex',
    name: 'NebulaDEX',
    description:
      'A decentralised exchange built on cross-chain infrastructure using LayerZero. Enables token swaps across EVM chains without bridging friction. Audited smart contracts with a fully on-chain orderbook.',
    category: ['web3', 'smart-contract'],
    techStack: ['Solidity', 'React', 'Ethers.js', 'Hardhat', 'LayerZero'],
    status: 'live',
    demoUrl: 'https://nebula.example.com',
    githubUrl: 'https://github.com/example/nebula-dex',
    assets: ['nebula-dex.png'],
    featured: true,
  },
  {
    id: 'orbit-cms',
    name: 'OrbitCMS',
    description:
      'A headless CMS built for developer-first teams. Supports rich structured content, role-based access, and a REST + GraphQL API layer. Ships with a fully typed SDK.',
    category: ['web-app'],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'GraphQL'],
    status: 'live',
    demoUrl: 'https://orbit.example.com',
    featured: false,
  },
  {
    id: 'vault-protocol',
    name: 'VaultProtocol',
    description:
      'A DeFi yield aggregator that routes deposits across lending protocols to maximise APY. Strategy contracts are upgradeable via governance and protected by a timelocked multisig.',
    category: ['web3', 'smart-contract'],
    techStack: ['Solidity', 'Hardhat', 'The Graph', 'React', 'Wagmi'],
    status: 'in-progress',
    githubUrl: 'https://github.com/example/vault-protocol',
    assets: ['vault-protocol.png'],
    featured: true,
  },
  {
    id: 'starship-ui',
    name: 'StarshipUI',
    description:
      'An open-source React component library for dark-theme product UIs. Includes 40+ accessible, motion-ready primitives with full TypeScript and Storybook coverage.',
    category: ['web-app'],
    techStack: ['React', 'TypeScript', 'Tailwind', 'Storybook', 'Radix UI'],
    status: 'archived',
    githubUrl: 'https://github.com/example/starship-ui',
    featured: false,
  },
  {
    id: 'pulsar-api',
    name: 'PulsarAPI',
    description:
      'A high-throughput REST and WebSocket API gateway with rate limiting, JWT auth, and per-tenant isolation. Handles real-time event streaming to connected clients with Redis pub/sub.',
    category: ['web-app'],
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'WebSocket'],
    status: 'in-progress',
    featured: false,
  },
  {
    id: 'chain-bridge',
    name: 'ChainBridge',
    description:
      'A generalised message-passing bridge connecting EVM and non-EVM chains. The relayer network is permissionless; proofs are verified on-chain using a light-client model.',
    category: ['web3'],
    techStack: ['LayerZero', 'Solidity', 'React', 'TypeScript', 'Rust'],
    status: 'live',
    demoUrl: 'https://chainbridge.example.com',
    assets: ['chain-bridge.png'],
    featured: true,
  },
  {
    id: 'cosmos-dash',
    name: 'CosmosDash',
    description:
      'An analytics dashboard for multi-chain DeFi portfolios. Aggregates positions, yields, and liquidity exposure across protocols with live on-chain data feeds.',
    category: ['web-app', 'web3'],
    techStack: ['React', 'TypeScript', 'Ethers.js', 'Recharts', 'Viem'],
    status: 'live',
    demoUrl: 'https://cosmos.example.com',
    featured: false,
  },
  {
    id: 'nova-contracts',
    name: 'NovaContracts',
    description:
      'A suite of production-grade ERC-20 and ERC-721 contracts with advanced tokenomics: vesting schedules, staking modules, and governance primitives built on OpenZeppelin.',
    category: ['smart-contract'],
    techStack: ['Solidity', 'Foundry', 'OpenZeppelin', 'Slither'],
    status: 'archived',
    githubUrl: 'https://github.com/example/nova-contracts',
    featured: false,
  },
  {
    id: 'quasar-tools',
    name: 'QuasarTools',
    description:
      'An internal DevOps toolkit that automates staging deployments, DB migrations, and environment provisioning. Cuts deploy time from 40 minutes to under 3.',
    category: ['other'],
    techStack: ['Python', 'FastAPI', 'Docker', 'GitHub Actions', 'Terraform'],
    status: 'live',
    featured: false,
  },
]
