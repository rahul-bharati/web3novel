import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};

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
        <div className="w-full mt-5">
          <Tiptap />
        </div>
      </div>
    </div>
  );
};

export default Write;
