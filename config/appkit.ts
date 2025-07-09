import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, solana } from '@reown/appkit/networks'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
export const projectId = process.env.NUXT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const networks = [mainnet, arbitrum, solana]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

export const solanaAdapter = new SolanaAdapter()