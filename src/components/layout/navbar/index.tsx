import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../contexts/AppContext";
import { ChainID, getOnBoard, getWeb3 } from "../../../utils/wallet";

declare global {
  interface Window {
    __web3: any;
    __onBoard: any;
    __walletAddress: any;
    __connected: any;
    ethereum: any;
  }
}

const Navbar = () => {
  const context = useAppContext();
  useEffect(() => {
    context.setWeb3(window.__web3 || null);
    context.setOnBoard(window.__onBoard || null);
    context.setWalletAddress(window.__walletAddress || null);
    context.setConnected(window.__connected || false);
  }, []);

  useEffect(() => {
    window.__web3 = context.web3;
  }, [context.web3]);
  useEffect(() => {
    window.__onBoard = context.onBoard;
  }, [context.onBoard]);
  useEffect(() => {
    window.__walletAddress = context.walletAddress;
  }, [context.walletAddress]);
  useEffect(() => {
    window.__connected = context.connected;
  }, [context.connected]);

  useEffect(() => {
    const addressAvailable = () => {
      if (context.walletAddress) {
        return;
      }

      if (
        context.web3 &&
        context.web3.currentProvider &&
        context.web3.currentProvider.selectedAddress &&
        context.web3.currentProvider.selectedAddress.length > 0
      ) {
        context.setWalletAddress(context.web3.currentProvider.selectedAddress);
      } else {
        setTimeout(addressAvailable, 100);
      }
    };

    if (context.web3) {
      addressAvailable();
    }
  }, [context.web3, context.walletAddress]);

  useEffect(() => {
    const walletInitialize = async () => {
      const _web3 = await getWeb3();
      const _onBoard = await getOnBoard();
      const _chainId = await _web3?.eth.getChainId();
      const _address = await _web3?.eth.getAccounts();

      context.setWeb3(_web3);
      context.setOnBoard(_onBoard);

      const connectStatus = localStorage.getItem("rg_connect");
      if (
        _address !== undefined &&
        (connectStatus === null || connectStatus === "true")
      ) {
        if (_address[0] && _chainId === ChainID) context.setConnected(true);

        context.setWalletAddress(_address[0]);
      }
    };

    if (typeof window !== "undefined") {
      if (window.ethereum) {
        window.ethereum.on("disconnect", logout);
        window.ethereum.on("accountsChanged", logout);
      }
    }

    walletInitialize();
  }, []);

  const connectHandler = async () => {
    if (context.onBoard !== null) {
      if (!(await context.onBoard.walletSelect())) {
        return;
      }
      context.setConnected(await context.onBoard.walletCheck());
      localStorage.setItem("rg_connect", "true");
    }
  };

  const logout = () => {
    if (context.onBoard != null) {
      context.onBoard.walletReset();
    }
    context.setWalletAddress(null);
    context.setConnected(false);
    localStorage.setItem("rg_connect", "false");
  };

  const sliceAddress = (val: string) => {
    return val.slice(0, 5) + "..." + val.slice(-4);
  };

  const handleConnectDisconnect = async () => {
    if (!context.connected) {
      await connectHandler();
    } else {
      logout();
    }
  };

  return (
    <nav className="container w-full">
      <div className=" justify-between flex ">
        <Link to={"/"} className="flex gap-2 justify-center items-center">
          <img src="/assets/icon/logo.png" alt="app logo" className="w-16" />
          <p className="text-xl font-bold text-gray-400 uppercase">Assessment Test</p>
        </Link>
        {context.connected && context.walletAddress ? (
          <div className="btn-connect flex items-center justify-between rounded-full px-4 sm:px-8 sm:py-1 border-app-black shadow-lg border-2 text-gray-400 font-bold hover:scale-105 transform bg-app-black-light border-r-2 border-b-2">
            <span className="mr-2">{sliceAddress(context.walletAddress)}</span>
            <span className="cursor-pointer flex-shrink-0" onClick={handleConnectDisconnect}>
              <img
                src="/assets/icon/ico_close.png"
                alt="close icon"
                className="w-4"
              />
            </span>
          </div>
        ) : (
          <button
            id="btn-wallet-connect"
            className="btn-connect cursor-pointer rounded-full px-4 sm:px-8 sm:py-1 border-app-black shadow-lg border-2 text-gray-400 font-bold hover:scale-105 transform bg-app-black-light border-r-2 border-b-2"
            onClick={handleConnectDisconnect}
          >
            <span className="text-secondary tracking-wider font-recoleta-bold">
              Connect
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
