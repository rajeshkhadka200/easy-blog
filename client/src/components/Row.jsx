import React from "react";
import style from "../css/row.module.css";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { SiHashnode } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
const Row = ({ blog }) => {
  const navigate = useNavigate();
  const EditArticle = () => {
    navigate(`/markdown`, { state: blog._id });
  };
  const redirect = "/edit/" + blog._id;
  return (
    <div className={style.row}>
      <div className={style.sn}>1</div>
      <div className={style.title}>
        <div className={style.blogCover}>
          <img src={blog.cover} alt="not_found" />
        </div>
        <div className={style.blogTitle}>{blog?.title}</div>
      </div>
      <div className={style.readOn}>
        <SiHashnode className={style.hashnode} />
        <img className={style.dev} src="/dev.svg" alt="" />
      </div>
      <div className={style.added_date}>{blog?.published_on}</div>

      <div className={style.action}>
        <MdDelete size={27} />
        <NavLink to={redirect}>
          <AiTwotoneEdit fontSize={27} />
        </NavLink>
      </div>
    </div>
  );
};

export default Row;
