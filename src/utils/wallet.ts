const APP_NAME = process.env.REACT_APP_NAME;
const APP_URL = process.env.REACT_APP_URL;
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const BLOCKNATIVE_KEY = process.env.REACT_APP_BLOCKNATIVE_KEY;
const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL;
const RPC_URL = process.env.REACT_APP_RPC_URL;

const NETWORK_ID =
  process.env.REACT_APP_CHAIN_ID !== undefined
    ? parseInt(process.env.REACT_APP_CHAIN_ID)
    : 4;

const wallets = [
  { walletName: "metamask", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: "authereum", preferred: true },
  {
    walletName: "walletConnect",
    infuraKey: INFURA_KEY,
    preferred: true,
  },
  { walletName: "opera" },
  { walletName: "operaTouch" },
  { walletName: "torus" },
  {
    walletName: "trezor",
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL,
  },
  {
    walletName: "ledger",
    rpcUrl: RPC_URL,
  },
  {
    walletName: "lattice",
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: "cobovault",
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
];

export const ChainID = NETWORK_ID;

export const getWeb3 = async () => {
  if (typeof window !== "undefined" && RPC_URL !== undefined) {
    const { default: Web3 } = await import("web3");
    const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
      timeout: 10000,
    });
    const web3 = new Web3(window.ethereum || httpProvider);
    return web3;
  } else {
    return null;
  }
};

export const getOnBoard = async () => {
  if (typeof window !== "undefined") {
    const { default: Onboard } = await import("bnc-onboard");
    const onboard = Onboard({
      dappId: BLOCKNATIVE_KEY,
      networkId: NETWORK_ID,
      darkMode: true,
      walletSelect: {
        wallets: wallets,
      },
    });

    return onboard;
  } else {
    return null;
  }
};
