import type { NextComponentType } from "next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading: NextComponentType = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-20 bg-black/[.5] flex items-center justify-center flex-col">
      <AiOutlineLoading3Quarters className="text-white text-5xl animate-spin mb-8" />
      <h2 className="text-3xl text-gray-50 font-bold">Publishing</h2>
    </div>
  );
};

export default Loading;
