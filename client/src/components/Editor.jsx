import React, { useState, useRef, useEffect, useContext } from "react";
import onlyEditor from "../css/editor.module.css";
import { ContexStore } from "../libs/Context";

// for markdown
// import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

const Editor = () => {
  //context provider
  const { content } = useContext(ContexStore);
  const [blog, setisBlog] = content;

  function handleEditorChange({ html, text }) {
    //set blog content
    setisBlog({
      ...blog,
      ["markdown"]: text,
    });
  }
  return (
    <>
      <MdEditor
        name="markdown"
        style={{ height: "385px" }}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default Editor;
