import React from "react";
import style from "../css/noblog.module.css";
import { MdContentPasteOff } from "react-icons/md";
import { NavLink } from "react-router-dom";
const NoBlog = () => {
  return (
    <>
      <div className={style.noblog_con}>
        <div className={style.border}>
          <MdContentPasteOff className={style.icon} size={90} />
        </div>
        <span>
          No blog yet ! <NavLink to="/markdown">click to post ?</NavLink>
        </span>
      </div>
    </>
  );
};

export default NoBlog;
