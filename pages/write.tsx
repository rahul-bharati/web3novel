import type { NextPage } from "next";
import dynamic from "next/dynamic";

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
  return (
    <div className="w-full my-10">
      <div className="container max-w-[1200px] mx-auto px-4 h-screen">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          className="text-5xl w-full bg-transparent outline-none border-none text-gray-100 placeholder:text-gray-50 py-2"
          autoFocus
          multiple
        />
        <div className="w-full mt-5 text-gray-100">
          <QuillNoSSRWrapper
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Write your story here..."
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
