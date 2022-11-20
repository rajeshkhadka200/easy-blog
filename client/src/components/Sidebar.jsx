import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import style from "../css/sidebar.module.css";
const Sidebar = () => {
  const location = window.location.pathname;
  const pathname = location.replace("/", "");

  return (
    <>
      <div className={style.sidebar}>
        <div className={style.links}>
          <NavLink activeClassName="active" to="/app">
            <BiHomeAlt fontSize={18} />
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/profile">
            <AiOutlineUser fontSize={20} />
            Profile
          </NavLink>
          <NavLink activeClassName="active" to="/all-blogs">
            <MdOutlineExplore fontSize={20} />
            Community Blog
          </NavLink>
        </div>
        <div className={style.last_btn}>
          <NavLink to={"/markdown"} className={style.button}>
            <AiOutlinePlus size={20} /> Create Blog
          </NavLink>
          {/* <button>
            <FiLogOut /> Log out 
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
