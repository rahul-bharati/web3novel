import type { NextComponentType } from "next";
import Lottie from "lottie-react";
import ReaderData from "../lotties/reader.json";

const Hero: NextComponentType = () => {
  return (
    <div className="container max-w-[1200px] h-screen mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-10 my-10 -mt-10">
      <div className="w-full">
        <h2 className="text-6xl font-bold text-gray-50 text-center md:text-left">
          Here lives amazing stories...
        </h2>
      </div>
      <div className="max-w-[500px] w-full">
        <Lottie animationData={ReaderData} className="w-full" loop={true} />
      </div>
    </div>
  );
};

export default Hero;
