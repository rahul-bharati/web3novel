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
import { useRouter } from "next/router";
import { Interface } from "readline";
import { generateSlug } from "./../utils/slug";

declare global {
  interface Window {
    walletConnection: any;
  }
}

interface User {
  address: string;
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
}

interface Story {
  title: string;
  content: string;
}

interface Props {
  children: JSX.Element;
}

interface Web3NovelContract extends Contract {
  getUser: Function;
  addUser: Function;
  addStory: Function;
  getStories: Function;
}

interface IAppContext {
  user: string;
  storyObj: Story;
  setStoryObj: Function;
  signIn: Function;
  signOut: Function;
  fetchCurrentUser: Function;
  updateCurrentUser: Function;
  createStory: Function;
}

export const AppContext = createContext<IAppContext>({
  user: "",
  signIn: () => {},
  signOut: () => {},
  fetchCurrentUser: () => {},
  updateCurrentUser: () => {},
  createStory: () => {},
  storyObj: { title: "", content: "" },
  setStoryObj: () => {},
});

export const AppContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const [wallet, setWallet] = useState<WalletConnection>();
  const [nearConfig, setNearConfig] = useState<Near>();
  const [nearContract, setNearContract] = useState<
    Web3NovelContract | Contract
  >();
  const [storyObj, setStoryObj] = useState<Story>({ title: "", content: "" });

  const [user, setUser] = useState("");

  const initContract = async () => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const nearConfig = getConfig(process.env.NEXT_PUBLIC_ENV || "testnet");
    const near = await connect({
      keyStore,
      deps: {
        keyStore,
      },
      ...nearConfig,
      headers: { "Content-Type": "application/json" },
    });
    const walletConnection = new WalletConnection(near, "web3novel");
    const contract = await new Contract(
      walletConnection.account(),
      nearConfig.contractName,
      {
        viewMethods: ["getUser", "getStories"],
        changeMethods: ["addUser", "addStory"],
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
  }, []);

  useEffect(() => {
    if (wallet?.isSignedIn()) {
      setUser(wallet.getAccountId());
    } else {
      setUser("");
    }
  }, [wallet]);

  const signIn = () => {
    wallet?.requestSignIn(
      {
        contractId: nearContract?.contractId,
        methodNames: ["getUser", "addUser"],
      },
      CONTRACT_NAME
    );
  };

  const signOut = () => {
    wallet?.signOut();
    setUser("");
    router.push("/");
  };

  const fetchCurrentUser = async () => {
    const contract = nearContract as Web3NovelContract;
    const nearUser = await contract?.getUser({ id: user });
    return nearUser;
  };

  const updateCurrentUser = async ({
    firstname,
    lastname,
    email,
    bio,
  }: User) => {
    const contract = nearContract as Web3NovelContract;
    await contract?.addUser({
      _firstname: firstname,
      _lastname: lastname,
      _email: email,
      _bio: bio,
    });
    const nearUser = await fetchCurrentUser();
    return nearUser;
  };

  const createStory = async () => {
    const contract = nearContract as Web3NovelContract;
    const slug = generateSlug(storyObj.title);
    await contract?.addStory({
      _title: storyObj.title,
      _content: storyObj.content,
      _slug: slug,
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        signIn,
        signOut,
        fetchCurrentUser,
        updateCurrentUser,
        createStory,
        storyObj,
        setStoryObj,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
