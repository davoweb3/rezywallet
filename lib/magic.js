import { Magic } from "magic-sdk";

const createMagic = (key) => {
  const customNodeOptions = {
    rpcUrl: 'https://rpc.testnet.fantom.network/', // Polygon RPC URL
    chainId: 4002, // Fantom chain id
  }

  return typeof window !== "undefined" && new Magic(key, {
    network: customNodeOptions
  });
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);