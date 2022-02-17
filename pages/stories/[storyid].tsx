import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "./../../context/AppContext";

const Stories: NextPage = () => {
  const router = useRouter();
  const { storyid } = router.query;

  const { fetchStoryFromNear } = useContext(AppContext);

  return (
    <div className="w-full">
      <h1 className="text-white">{storyid}</h1>
    </div>
  );
};

export default Stories;
