import type { NextComponentType } from "next";
import Lottie from "lottie-react";
import CryptoData from "../lotties/crypto.json";

const Earn: NextComponentType = () => {
  return (
    <div className="container max-w-[1200px] h-screen mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-10 my-10">
      <div className="max-w-[500px] w-full">
        <Lottie animationData={CryptoData} className="w-full" loop={true} />
      </div>
      <div className="w-full">
        <p className="text-xl text-gray-200">EARN</p>
        <h2 className="text-4xl font-bold text-gray-50 text-center md:text-left py-8">
          Get paid in Crypto for your stories being read
        </h2>
        <p className="text-xl text-gray-500">
          No paywall or waiting to get paid. Get paid in crypto in your wallet.
        </p>
        <button className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full mt-5">
          Get Started &rarr;
        </button>
      </div>
    </div>
  );
};

export default Earn;
