import { verifyMessage } from "@wagmi/core";
import { http, createConfig } from "@wagmi/core";
import { mainnet, bsc, polygon, arbitrum, base } from "@wagmi/core/chains";
import { Base58 } from "@ethersproject/basex";
import nacl from "tweetnacl";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Reads and parses the JSON body
  const { namespace, address, signature } = body;
  const message = "Sign this message to authenticate with your wallet: HELLO";
  if (namespace === "solana") {
    const signatureUint8 = Base58.decode(signature);
    const pubKeyUint8 = Base58.decode(address);
    const messageUint8 = new TextEncoder().encode(message);

    const isValid = nacl.sign.detached.verify(
      messageUint8,
      signatureUint8,
      pubKeyUint8
    );
    if (!isValid) {
      return { error: "Signature verification failed", success: false };
    }

    return { success: true, message: "Signature is valid" };
  } else if (namespace === "eip155") {
    const wagmiConfig = createConfig({
      chains: [mainnet, bsc, polygon, arbitrum, base],
      transports: {
        [mainnet.id]: http(),
        [bsc.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [base.id]: http(),
      },
    });
    const valid = await verifyMessage(wagmiConfig, {
      address: address,
      message: message,
      signature: signature,
    });

    if (!valid) {
      return { error: "Signature verification failed", success: false };
    }

    return { success: true, message: "Signature is valid" };
  }
});
