import React, { useContext, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import style from "../css/markdown.module.css";
import Editor from "../components/Editor";
import MDEditor from "@uiw/react-md-editor";

import PopupContainer from "../components/PopupContainer";
import { ContexStore } from "../libs/Context";

const Markdown = () => {
  //  context provider
  const { modal, content } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;
  const [blog, setisBlog] = content;
  // console.log(blog);
  // handle for popup
  const open = () => {
    document.body.style.overflow = "hidden";
    setispopUp(!ispopUp);
  };

  // state for image cover upload
  const [cover, setCover] = useState({
    url: "",
    img: "",
  });

  // function to handle image cover upload
  const handleImg = () => {
    let input = document.createElement("INPUT");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", (e) => {
      setCover({
        url: URL.createObjectURL(e.target.files[0]),
        img: e.target.files[0],
      });
    });
  };

  // function to handle image cover delete
  const removeCover = () => {
    setCover({
      url: "",
      img: "",
    });
  };

  const handleBlog = (e) => {
    setisBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {ispopUp && <PopupContainer heading={"Publish this article on ?"} />}
      <div className={style.markdownCon}>
        {cover.url ? <img src={cover.url} alt="image" /> : ""}
        <div className={style.header}>
          <div className={style.btnGrp}>
            {!cover.url ? (
              <div className={style.addBtn} onClick={handleImg}>
                <BiImageAdd size={20} />
                Add Cover
              </div>
            ) : (
              <div
                id={style.rm_btn}
                onClick={removeCover}
                className={style.addBtn}
              >
                <AiOutlineDelete size={20} />
                Remove Cover
              </div>
            )}
          </div>
          <button onClick={open}>
            <CiShare1 fontSize={20} />
            Publish
          </button>
        </div>
        {/* input */}
        <div className={style.title}>
          <textarea
            placeholder="Article title ..."
            id="text"
            name="title"
            rows="2"
            cols="50"
            onChange={handleBlog}
          ></textarea>
        </div>
        {/* actual markdown */}
        <Editor />
      </div>
    </>
  );
};

export default Markdown;
