import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext } from "react";
import Loading from "../components/Loading";
import { AppContext } from "./../context/AppContext";
import NotLoggedIn from "./../components/NotLoggedIn";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

const Write: NextPage = () => {
  const { user, storyObj, setStoryObj, loading } = useContext(AppContext);

  return user ? (
    <>
      {loading && <Loading />}
      <div className="w-full my-10">
        <div className="container max-w-[1200px] mx-auto px-4 min-h-screen">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="text-5xl w-full bg-transparent outline-none border-none text-gray-100 placeholder:text-gray-50 py-2"
            value={storyObj.title}
            onChange={(e) =>
              setStoryObj({ ...storyObj, title: e.target.value })
            }
            autoFocus
            multiple
          />
          <div className="w-full mt-5 text-gray-100">
            <QuillNoSSRWrapper
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Write your story here..."
              value={storyObj.content}
              onChange={(e) => setStoryObj({ ...storyObj, content: e })}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <NotLoggedIn />
  );
};

export default Write;
