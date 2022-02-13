import type { NextPage } from "next";
import { useRouter } from "next/router";

const Stories: NextPage = () => {
  const router = useRouter();
  const { storyid } = router.query;
  return <h1 className="text-white">{storyid}</h1>;
};

export default Stories;
