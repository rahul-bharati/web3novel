import type { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <div className="w-full top-0 left-0 bg-gray-900 shadow-md py-8 border-t-2 border-gray-700">
      <div className="container mx-auto max-w-[1200px] p-4 flex items-center justify-between">
        <div className="brand">
          <h1 className="text-2xl text-gray-50">Web3Novel</h1>
          <p className="text-sm text-gray-600">
            &copy; 2021, All rights reserved
          </p>
        </div>
        <ul className="list-none text-white flex items-center justify-center">
          <li className="text-xl mx-2">Write</li>
          <li className="text-xl mx-2">Stories</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
