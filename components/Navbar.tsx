import type { NextComponentType } from "next";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";

const Navbar: NextComponentType = () => {
  const { signIn, user, signOut } = useContext(AppContext);

  return (
    <div className="w-full fixed top-0 left-0 bg-gray-900 z-10 shadow-md">
      <div className="container mx-auto max-w-[1200px] p-4 flex items-center justify-between">
        <div className="brand">
          <h1 className="text-2xl text-gray-50">Web3Novel</h1>
        </div>
        <ul className="list-none text-white flex items-center justify-center">
          <li className="text-xl mx-2">Write</li>
          <li className="text-xl mx-2">Stories</li>
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
            <li className="text-xl ml-4">
              <button
                className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
