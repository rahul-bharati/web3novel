import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { validateEmail } from "./../utils/validation";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Profile: NextPage = () => {
  const { user, signIn, fetchCurrentUser, updateCurrentUser } =
    useContext(AppContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    const nearUser = await fetchCurrentUser();
    setFirstname(nearUser && nearUser.firstname ? nearUser.firstname : "");
    setLastname(nearUser && nearUser.lastname ? nearUser.lastname : "");
    setEmail(nearUser && nearUser.email ? nearUser.email : "");
    setBio(nearUser && nearUser.bio ? nearUser.bio : "");
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    if (email.length > 0 && !validateEmail(email)) {
      return setEmailError("Please enter a valid email");
    }
    const nearUser = await updateCurrentUser({
      firstname,
      lastname,
      email,
      bio,
    });
    setFirstname(nearUser && nearUser.firstname ? nearUser.firstname : "");
    setLastname(nearUser && nearUser.lastname ? nearUser.lastname : "");
    setEmail(nearUser && nearUser.email ? nearUser.email : "");
    setBio(nearUser && nearUser.bio ? nearUser.bio : "");
    setLoading(false);
  };

  return user ? (
    <div className="w-full">
      <div className="bg-gray-800">
        <div className="container max-w-[1200px] py-10 px-4 mx-auto">
          <h2 className="text-4xl text-gray-50 font-bold">
            Edit your settings
          </h2>
        </div>
      </div>
      <div className="container max-w-[1200px] py-10 px-4 mx-auto">
        <div className="container max-w-[600px]">
          <div className="form-container">
            <h4 className="text-lg text-gray-50">User ID</h4>
            <input
              type="text"
              name="userId"
              id="userId"
              className="w-full outline-none border-0 bg-transparent rounded-sm border-b-2 border-gray-500 pt-1 pb-0 text-lg text-gray-400 font-bold transition-all focus:border-gray-50"
              placeholder="User ID"
              readOnly
              value={user || ""}
              autoComplete="off"
            />
          </div>
          <div className="form-container mt-6">
            <h4 className="text-lg text-gray-50">First Name</h4>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full outline-none border-0 bg-transparent rounded-sm border-b-2 border-gray-500 pt-1 pb-0 text-lg text-gray-400 font-bold transition-all focus:border-gray-50"
              placeholder="First Name"
              autoComplete="off"
              value={firstname || ""}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-container mt-6">
            <h4 className="text-lg text-gray-50">Last Name</h4>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full outline-none border-0 bg-transparent rounded-sm border-b-2 border-gray-500 pt-1 pb-0 text-lg text-gray-400 font-bold transition-all focus:border-gray-50"
              placeholder="Last Name"
              autoComplete="off"
              value={lastname || ""}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-container mt-6">
            <h4 className="text-lg text-gray-50">Email</h4>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full outline-none border-0 bg-transparent rounded-sm border-b-2 border-gray-500 pt-1 pb-0 text-lg text-gray-400 font-bold transition-all focus:border-gray-50"
              placeholder="Email"
              autoComplete="off"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-red-400">{emailError}</p>
          </div>
          <div className="form-container mt-6">
            <h4 className="text-lg text-gray-50">Bio</h4>
            <input
              type="text"
              name="bio"
              id="bio"
              className="w-full outline-none border-0 bg-transparent rounded-sm border-b-2 border-gray-500 pt-1 pb-0 text-lg text-gray-400 font-bold transition-all focus:border-gray-50"
              placeholder="Bio"
              autoComplete="off"
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button
            className="btn px-8 py-2 text-xl text-white bg-blue-600 rounded-full mt-10 flex items-center justify-center transition-all disabled:bg-blue-800"
            onClick={handleUpdateUser}
            disabled={loading}
          >
            Update{" "}
            {loading && (
              <AiOutlineLoading3Quarters className="ml-3 animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
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

export default Profile;
