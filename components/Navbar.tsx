import type { NextComponentType } from "next";

const Navbar: NextComponentType = () => {
  return (
    <div className="w-screen">
      <div className="container mx-auto max-w-[1200px] p-4 flex items-center justify-between">
        <div className="brand">
          <h1 className="text-2xl text-gray-50">Web3Novel</h1>
        </div>
        <ul className="list-none text-white flex items-center justify-center">
          <li className="text-xl mx-2">Write</li>
          <li className="text-xl mx-2">Stories</li>
          <li className="text-xl ml-4">
            <button className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full">
              Sign in
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
