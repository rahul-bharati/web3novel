import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "./../../context/AppContext";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
import Loading from "../../components/Loading";

interface Story {
  title: string;
  content: string;
  added_on: string;
  slug: string;
  writtenBy: string;
}

const Stories: NextPage = () => {
  const { fetchStoriesFromNear, loading, setLoading } = useContext(AppContext);
  const [stories, setStories] = useState<Story[]>([]);

  const fetchStories = async () => {
    setLoading(true);
    const nearStories = await fetchStoriesFromNear();

    if (nearStories) {
      const items = await Promise.all(
        nearStories.map(
          async (data: {
            title: string;
            content: string;
            address: string;
            slug: string;
            added_on: number;
          }) => {
            const storyUri = data.content;
            const storageData = await axios.get(storyUri);
            const item: Story = {
              title: data.title,
              content: storageData.data.content,
              added_on: new Date(data.added_on / 1000).toLocaleDateString(),
              slug: data.slug,
              writtenBy: data.address,
            };
            return item;
          }
        )
      );
      setStories(items);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-full my-10 min-h-screen">
      {loading && <Loading />}
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-white text-4xl text-center mb-10 font-bold tracking-wide">
          Explore amazing stories
        </h2>
        <div className="w-full max-w-[650px] mx-auto">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div
                className="w-full p-4 bg-gray-800 my-2 rounded-md text-gray-50 shadow-sm"
                key={story.slug}
              >
                <h3 className="text-xl font-bold tracking-wide">
                  &#8220;{story.title}&#8221;{" "}
                  <span className="text-gray-200 text-xl">
                    By {story.writtenBy}
                  </span>
                </h3>
                <p className="text-lg mt-3">
                  {story.content.length > 255
                    ? ReactHtmlParser(
                        story.content.substring(0, 252) + "...</p>"
                      )
                    : ReactHtmlParser(story.content)}
                </p>
                <Link href={`/stories/${story.slug}`} passHref>
                  <a className="text-white bg-blue-500 px-2 py-1 inline-block mt-5 rounded-full">
                    Read more...
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <>
              <p className="text-white">
                No stories found. You could write a new one
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;
