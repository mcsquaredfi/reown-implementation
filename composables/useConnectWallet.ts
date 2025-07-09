
import { useAppKitClientOnly } from "./useAppKit";
let isInitialized = false;

export const useConnectWallet = () => {
  const appKit = useAppKitClientOnly();

  const {
    useAppKit,
    createAppKit,
    useDisconnect,
    wagmiAdapter,
    networks,
    projectId,
  } = appKit;

  const initAppKit = () => {
    if (isInitialized) return;

    createAppKit({
      adapters: [wagmiAdapter],
      networks: networks,
      projectId: projectId,
      allWallets: "SHOW",
      features: {
        email: false,
        analytics: true,
        socials: [
          "google",
          'x'
        ],
        emailShowWallets: true,
      },
    });

    isInitialized = true;
  };

  const handleWalletConnection = async () => {
    if (import.meta.client) {
      const modal = useAppKit();
      const disconnectHook = useDisconnect();
      if (modal) {
        await disconnectHook.disconnect();
        modal.open("Connect");
      };
    }
  }

  return {
    initAppKit,
    connectWallet: handleWalletConnection,
  };
}