import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

import style from "../css/sidebar.module.css";
const Sidebar = () => {
  return (
    <>
      <div className={style.sidebar}>
        <div className={style.links}>
          <Link to="/">
            <BiHomeAlt fontSize={20} />
            Home
          </Link>
          <Link to="/">
            <MdOutlineExplore fontSize={20} />
            Community Blog
          </Link>
          <Link to="/">
            <AiOutlineUser fontSize={20} />
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
