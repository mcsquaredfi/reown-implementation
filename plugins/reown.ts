export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    createAppKit,
    useAppKit,
    useAppKitAccount,
    useDisconnect,
    useAppKitNetwork,
    useAppKitProvider,
    useAppKitEvents,
  } = await import('@reown/appkit/vue')

  const { WagmiPlugin } = await import('@wagmi/vue')
  const { WagmiAdapter } = await import('@reown/appkit-adapter-wagmi')
  const { mainnet, sepolia, bsc, polygon, arbitrum, base } = await import('@reown/appkit/networks')
  const { QueryClient } = await import('@tanstack/vue-query')

  const projectId = useRuntimeConfig().public.projectId

  const networks = [mainnet, sepolia, bsc, polygon, arbitrum, base]

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId
  })


  const queryClient = new QueryClient()

  nuxtApp.provide('appKit', {
    createAppKit,
    useAppKit,
    useAppKitAccount,
    useDisconnect,
    useAppKitNetwork,
    useAppKitProvider,
    useAppKitEvents,
    wagmiAdapter,
    networks,
    projectId,
  })

  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig, queryClient })
})
