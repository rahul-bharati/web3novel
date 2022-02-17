import type { NextComponentType } from "next";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";

const NotLoggedIn: NextComponentType = () => {
  const { signIn } = useContext(AppContext);

  return (
    <div className="w-full h-screen flex items-center justify-center -mt-10">
      <div className="container max-w-[600px] mx-auto">
        <p className="text-xl text-gray-50">
          You are not signed in yet. Please sign in before accessing this
          section.
        </p>
        <button
          className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full mt-10"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
