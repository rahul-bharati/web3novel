import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Story } from ".";
import { AppContext } from "./../../context/AppContext";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

const Stories: NextPage = () => {
  const [story, setStory] = useState<Story>();

  const router = useRouter();
  const { storyid } = router.query;

  const { fetchStoryFromNear } = useContext(AppContext);

  const fetchStory = async () => {
    const nearStory = await fetchStoryFromNear(storyid);
    if (nearStory) {
      const storyData = await axios.get(nearStory.content);
      setStory({
        title: nearStory.title,
        content: storyData.data.content,
        added_on: new Date(nearStory.added_on / 1000).toLocaleDateString(),
        slug: nearStory.slug,
        writtenBy: nearStory.address,
      });
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {story?.title ? (
        <>
          <div className="bg-gray-800 py-10 px-4 w-full">
            <h2 className="text-white text-center text-4xl font-bold tracking-wide">
              {story?.title}
            </h2>
            <p className="text-xl text-center text-gray-500 mt-3">
              {story?.writtenBy}
            </p>
          </div>
          <div className="mx-auto max-w-[680px] my-8 text-gray-50 text-lg text-justify">
            {ReactHtmlParser(story?.content || "")}
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[680px] text-center">
          <div className="-mt-10 text-gray-50 text-2xl text-center">
            Looks like you&apos;ve got in a wrong place...
          </div>
          <Link href="/stories" passHref>
            <a className="text-blue-500">Go to Stories</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Stories;
