export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    createAppKit,
    useAppKit,
    useAppKitAccount,
    useDisconnect,
    useAppKitNetwork,
    useAppKitProvider,
    useAppKitEvents,
  } = await import("@reown/appkit/vue");

  const { WagmiPlugin } = await import("@wagmi/vue");
  const { WagmiAdapter } = await import("@reown/appkit-adapter-wagmi");
  const { SolanaAdapter } = await import("@reown/appkit-adapter-solana");
  const { mainnet, sepolia, bsc, polygon, arbitrum, base, solana } =
    await import("@reown/appkit/networks");
  const { QueryClient } = await import("@tanstack/vue-query");

  const projectId = useRuntimeConfig().public.projectId;

  const networks = [mainnet, sepolia, bsc, polygon, arbitrum, base, solana];

  const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
  });

  const queryClient = new QueryClient();

  nuxtApp.provide("appKit", {
    createAppKit,
    useAppKit,
    useAppKitAccount,
    useDisconnect,
    useAppKitNetwork,
    useAppKitProvider,
    useAppKitEvents,
    solanaAdapter: new SolanaAdapter(),
    wagmiAdapter,
    networks,
    projectId,
  });

  nuxtApp.vueApp.use(WagmiPlugin, {
    config: wagmiAdapter.wagmiConfig,
    queryClient,
  });
});
