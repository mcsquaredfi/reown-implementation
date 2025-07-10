<template>
  <client-only>
    <div class="page-container">
      <h1>ReOwn AppKit Nuxt Wagmi/Solana Example</h1>
      <button @click="connectWallet" class="connect-button">
        <span v-if="auth?.connected">
          Connected: {{ auth.address }}
        </span>
        <span v-else>
          Connect Wallet
        </span>
      </button>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useSignMessage } from "@wagmi/vue";
const { useAppKitAccount, useAppKitProvider } = useAppKitClientOnly();
const { connectWallet } = useConnectWallet();
import { Base58 } from '@ethersproject/basex';
const appKitProvider = computed(() => useAppKitProvider(namespace.value));
const { signMessageAsync: signWagmiMessage } = useSignMessage()

const accountInfo = useAppKitAccount();
const namespace = computed(() => {
  const { caipAddress } = accountInfo.value;
  const [chainNameSpace] = caipAddress?.split(":") || [];
  return chainNameSpace || "eip155"; // Default to eip155 if not specified
});

const ACCOUNT_STATUS = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
};

const logout = () => {
  console.info('Logging out user');
};

const auth = ref({connected:false})

watch(
  () => accountInfo.value.status,
  async (newStatus) => {
    console.info('Account status changed:', newStatus);
    console.info('Current account info:', accountInfo.value);
    if (auth && newStatus === ACCOUNT_STATUS.DISCONNECTED) {
      console.info('Status: DISCONNECTED - Logout User');
      logout();
    } else if (newStatus === ACCOUNT_STATUS.CONNECTING) {
      console.info('Status: CONNECTING - Setting wallet message');
    } else if (newStatus === ACCOUNT_STATUS.CONNECTED) {
      console.info('Status: CONNECTED - Checking address');
      handleWalletConnection();
    }
  },
);

const handleWalletConnection =async () => {
  const { address } = accountInfo.value;
  const {signature, message} = await retrieveSignature(address);
  const res = await useFetch('/api/signer', {
    method: 'post',
    body: {
      address,
      signature,
      message,
      namespace: namespace.value,
    },
  })
  if (res.data.value?.success) {
    auth.value = {
    address,
    connected: true,
  };
  } else {
    alert("Failed to authenticate wallet, signature is invalid or expired");
  }
};

const signMessage = async (message: string, address: string) => {
  let { walletProvider } = appKitProvider?.value ?? {}; 
  try {
    if (namespace.value === "solana") {
      const input = new TextEncoder().encode(message);
      const signature = await walletProvider.signMessage(input);
      return Base58.encode(signature);
    } else if (namespace.value === "eip155") {
      const signature = await signWagmiMessage({ message, account: address });
      return signature;
    } else {
      throw new Error("Unsupported chain namespace: " + namespace.value);
    }
  } catch (error) {
    console.error("Error signing message:", error);
    throw error;
  }
};

const retrieveSignature = async (address: string) => {
  const message = `Sign this message to authenticate with your wallet: HELLO`;

  const signature = await signMessage(message, address);

  console.log("Signature retrieved:", { message, signature });

  return { signature, message };
};
</script>