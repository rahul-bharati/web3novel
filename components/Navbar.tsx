import type { NextComponentType } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { useRouter } from "next/router";

const Navbar: NextComponentType = () => {
  const { signIn, user, signOut, createStory, loading, setLoading } =
    useContext(AppContext);

  const [isWritePage, setIsWritePage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == "/write") {
      if (router.query.transactionHashes) {
        window.alert("Your story has been published.");
        router.push("/write");
      }
      setIsWritePage(true);
    } else {
      setIsWritePage(false);
    }
  }, [router.pathname, router]);

  const handlePublish = async () => {
    setLoading(true);
    await createStory();
    setLoading(false);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-gray-900 z-10 shadow-md">
      <div className="container mx-auto max-w-[1200px] p-4 flex items-center justify-between">
        <div className="brand">
          <Link href={"/"} passHref>
            <h1 className="text-2xl text-gray-50 cursor-pointer">Web3Novel</h1>
          </Link>
        </div>
        <ul className="list-none text-white flex items-center justify-center">
          {isWritePage ? (
            <>
              <li className="text-xl ml-4">
                <button
                  className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full"
                  onClick={() => handlePublish()}
                >
                  Publish
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="text-xl mx-2 cursor-pointer">
                <Link href="/write">Write</Link>
              </li>
              <li className="text-xl mx-2 cursor-pointer">
                <Link href="/stories">Stories</Link>
              </li>
              {!user ? (
                <li className="text-xl ml-4">
                  <button
                    className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full"
                    onClick={() => signIn()}
                  >
                    Sign in
                  </button>
                </li>
              ) : (
                <>
                  <li className="text-xl mx-2 cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="text-xl ml-4">
                    <button
                      className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
