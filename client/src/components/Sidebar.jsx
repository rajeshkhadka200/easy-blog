import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import style from "../css/sidebar.module.css";
const Sidebar = () => {
  const pathname = window.location.pathname.replace("/", "");

  const links = [
    {
      name: "Home",
      icon: <BiHomeAlt fontSize={18} />,
      path: "/app",
    },
    {
      name: "Explore",
      icon: <MdOutlineExplore fontSize={20} />,
      path: "/all-blogs",
    },
    {
      name: "Profile",
      icon: <AiOutlineUser size={20} />,
      path: "/profile",
    },
  ];
  return (
    <>
      <div className={style.sidebar}>
        <div className={style.links}>
          {links.map((data, i) => {
            const { name, icon, path } = data;
            return (
              <NavLink activeClassName="active" to={path}>
                {icon}
                {name}
              </NavLink>
            );
          })}
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
