import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [onBoard, setOnBoard] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        status,
        setStatus,
        onBoard,
        setOnBoard,
        web3,
        setWeb3,
        connected,
        setConnected,
        walletAddress,
        setWalletAddress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);