import type { NextComponentType } from "next";
import Lottie from "lottie-react";
import BooksData from "../lotties/books.json";

const Reader: NextComponentType = () => {
  return (
    <div className="container max-w-[1200px] h-screen mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-10 my-10">
      <div className="w-full">
        <p className="text-xl text-gray-200">FOR READERS</p>
        <h2 className="text-4xl font-bold text-gray-50 text-center md:text-left py-8">
          Experience your new favourite
        </h2>
        <p className="text-xl text-gray-500">
          Get lost in a great read – whenever, wherever. Plus, connect with
          up-and-coming authors before everyone else does.
        </p>
        <button className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full mt-5">
          Start Reading &rarr;
        </button>
      </div>
      <div className="max-w-[500px] w-full">
        <Lottie animationData={BooksData} className="w-full" loop={true} />
      </div>
    </div>
  );
};

export default Reader;
