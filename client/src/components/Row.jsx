import React, { useContext } from "react";
import style from "../css/row.module.css";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { SiHashnode } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
import PopupContainer from "./PopupContainer";

const Row = ({ blog, sn }) => {
  // context provider
  const { modal, dltids } = useContext(ContexStore);
  const [ids, setids] = dltids;

  const [ispopUp, setispopUp] = modal;

  const redirect = "/edit/" + blog._id;

  const openModal = (hashblogid, mongoblogid) => {
    setids({
      hashblogid: hashblogid,
      mongoblogid: mongoblogid,
    });
    setispopUp(true);
  };
  return (
    <>
      {ispopUp && <PopupContainer heading={"Are you sure ?"} />}
      <div className={style.row}>
        <div className={style.sn}>{sn + 1}</div>
        <div className={style.title}>
          <div className={style.blogCover}>
            <img src={blog.cover} alt="not_found" />
          </div>
          <div className={style.blogTitle}>{blog?.title}</div>
        </div>
        <div className={style.readOn}>
          <SiHashnode className={style.hashnode} />
          <img
            onClick={() => {
              window.open(blog?.original_link, "_blank");
            }}
            className={style.dev}
            src="/dev.svg"
          />
        </div>
        <div className={style.added_date}>{blog?.published_on}</div>

        <div className={style.action}>
          <div className={style.dlt}>
            <MdDelete
              aria-disabled
              onClick={() => {
                openModal(blog.remote_id.hashnode, blog._id);
              }}
              size={27}
            />
          </div>
          <NavLink to={redirect}>
            <AiTwotoneEdit fontSize={27} />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Row;
