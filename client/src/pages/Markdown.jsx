import React, { useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import style from "../css/markdown.module.css";
import Editor from "../components/Editor";

const Markdown = () => {
  const [cover, setCover] = useState({
    url: "",
    img: "",
  });
  const handleImg = () => {
    let input = document.createElement("INPUT");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
      setCover({
        url: URL.createObjectURL(e.target.files[0]),
        img: e.target.files[0],
      });
    });
  };
  const removeCover = () => {
    setCover({
      url: "",
      img: "",
    });
  };
  return (
    <>
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
          <button>
            <CiShare1 fontSize={20} />
            Publish
          </button>
        </div>
        {/* input */}
        <div className={style.title}>
          <textarea
            placeholder="Article title ..."
            id="text"
            name="text"
            rows="2"
            cols="50"
          ></textarea>
        </div>
        {/* actual markdown */}
        <Editor />
      </div>
    </>
  );
};

export default Markdown;
