import { createContext, useEffect, useState } from "react";
import {
  connect,
  Contract,
  keyStores,
  Near,
  WalletConnection,
} from "near-api-js";
import getConfig from "../config";
import { CONTRACT_NAME } from "./../config";

interface Props {
  children: JSX.Element;
}

interface IAppContext {
  user: string;
  signIn: Function;
  signOut: Function;
}

export const AppContext = createContext<IAppContext>({
  user: "",
  signIn: () => {},
  signOut: () => {},
});

export const AppContextProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletConnection>();
  const [nearConfig, setNearConfig] = useState<Near>();
  const [nearContract, setNearContract] = useState<Contract>();

  const [user, setUser] = useState("");

  const initContract = async () => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const nearConfig = getConfig(process.env.NEXT_PUBLIC_ENV || "testnet");
    const near = await connect({
      keyStore,
      ...nearConfig,
      headers: { "Content-Type": "application/json" },
    });
    const walletConnection = new WalletConnection(near, "web3novel");
    const contract = new Contract(
      walletConnection.account(),
      nearConfig.contractName,
      {
        viewMethods: ["getCurrentUser", "getUser"],
        changeMethods: ["addUser"],
      }
    );

    setWallet(walletConnection);
    setNearConfig(near);
    setNearContract(contract);
  };

  useEffect(() => {
    if (!wallet || !nearConfig || !nearContract) {
      initContract();
    }
    if (wallet?.isSignedIn()) {
      setUser(wallet.getAccountId());
    }
    console.log({ user, isConnected: wallet?.isSignedIn() });
  }, []);

  const signIn = () => {
    wallet?.requestSignIn(nearContract?.contractId, CONTRACT_NAME);
  };

  const signOut = () => {
    wallet?.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <AppContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AppContext.Provider>
  );
};
