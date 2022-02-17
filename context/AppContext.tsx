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
import { Web3Storage } from "web3.storage";
import { Web3StorageToken } from "../utils/tokens";
import { jsonFile, makeGatewayURL } from "../utils/storage";

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
  getStory: Function;
  getMyStories: Function;
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
  storageClient: Web3Storage | null;
  isStorageClientValid: Function;
  loading: boolean;
  setLoading: Function;
  fetchStoriesFromNear: Function;
  fetchStoryFromNear: Function;
  fetchMyStories: Function;
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
  storageClient: null,
  isStorageClientValid: () => {},
  loading: false,
  setLoading: () => {},
  fetchStoriesFromNear: () => {},
  fetchStoryFromNear: () => {},
  fetchMyStories: () => {},
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
  const [loading, setLoading] = useState(false);

  const storageClient = new Web3Storage({ token: Web3StorageToken });

  const isStorageClientValid = async () => {
    try {
      for await (const _ of storageClient.list({ maxResults: 1 })) {
        // any non-error response means the token is legit
        break;
      }
      return true;
    } catch (error: any) {
      // only return false for auth-related errors
      if (error.message.includes("401") || error.message.includes("403")) {
        console.log("invalid token", error.message);
        return false;
      }
    }
  };

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
        viewMethods: ["getUser", "getStories", "getStory", "getMyStories"],
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
    try {
      const contract = nearContract as Web3NovelContract;
      const slug = generateSlug(storyObj.title) + "-" + new Date().getTime();
      const metadata = jsonFile("metadata.json", { ...storyObj, owner: user });
      console.log(metadata);
      const storyCid = await storageClient.put([metadata], {
        name: "web3Novel_" + slug,
        onStoredChunk: (size) => {
          console.log(`Uploading... ${(size * 100).toFixed(2)} uploaded`);
        },
      });
      const metadataGatewayURL = makeGatewayURL(storyCid, "metadata.json");
      await contract?.addStory({
        _title: storyObj.title,
        _content: metadataGatewayURL,
        _slug: slug,
      });
    } catch (error) {
      window.alert("Unknown error ocurred");
      console.log(error);
    }
  };

  const fetchStoriesFromNear = async () => {
    const contract = nearContract as Web3NovelContract;
    const stories = await contract?.getStories();
    return stories;
  };

  const fetchStoryFromNear = async (slug: string) => {
    const contract = nearContract as Web3NovelContract;
    const story = await contract?.getStory({ slug: slug });
    return story;
  };

  const fetchMyStories = async () => {
    const contract = nearContract as Web3NovelContract;
    const stories = await contract?.getMyStories({ user: user });
    return stories;
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
        isStorageClientValid,
        storageClient,
        loading,
        setLoading,
        fetchStoriesFromNear,
        fetchStoryFromNear,
        fetchMyStories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
