import React from "react";
import style from "../css/row.module.css";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { SiHashnode } from "react-icons/si";

const Row = () => {
  return (
    <div className={style.row}>
      <div className={style.sn}>1</div>
      <div className={style.title}>
        <div className={style.blogCover}>
          <img src={"/cover.jpeg"} alt="not_found" />
        </div>
        <div className={style.blogTitle}>
          Introducing JUHU - A real time code collabraton tool.
        </div>
      </div>
      <div className={style.readOn}>
        <SiHashnode className={style.hashnode} />
        <img className={style.dev} src="/dev.svg" alt="" />
      </div>
      <div className={style.added_date}>2016-03-15</div>

      <div className={style.action}>
        <MdDelete size={27} />
        <AiTwotoneEdit fontSize={27} />
      </div>
    </div>
  );
};

export default Row;
