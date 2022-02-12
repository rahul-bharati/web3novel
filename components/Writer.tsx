import type { NextComponentType } from "next";
import Lottie from "lottie-react";
import WriterData from "../lotties/writer.json";

const Writer: NextComponentType = () => {
  return (
    <div className="container max-w-[1200px] h-screen mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-10 my-10">
      <div className="max-w-[500px] w-full">
        <Lottie animationData={WriterData} className="w-full" loop={true} />
      </div>
      <div className="w-full">
        <p className="text-xl text-gray-200">FOR WRITERS</p>
        <h2 className="text-4xl font-bold text-gray-50 text-center md:text-left py-8">
          Inspire Reader with your stories.
        </h2>
        <p className="text-xl text-gray-500">
          Get your stories infornt of new readers, build your audience and
          unlock your true potential.
        </p>
        <button className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full mt-5">
          How it works &rarr;
        </button>
      </div>
    </div>
  );
};

export default Writer;
