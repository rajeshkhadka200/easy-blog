import React, { useContext } from "react";

// icons
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

//imports
import { NavLink } from "react-router-dom";
import style from "../css/sidebar.module.css";
import { ContexStore } from "../libs/Context";
import PopupContainer from "../components/PopupContainer";

const Sidebar = () => {
  // context provider
  const { modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;

  // for active link
  const pathname = window.location.pathname.replace("/", "");

  // open for popup
  const openModal = () => {
    setispopUp(!ispopUp);
    document.body.style.overflow = "hidden";
  };

  // sidebar links
  let icon = ["app", "all-blogs", "profile", "apikey"];
  const links = [
    {
      name: "Home",
      icon: (
        <BiHomeAlt
          className={pathname === icon[0] && "active_icon"}
          fontSize={18}
        />
      ),
      path: "/app",
    },
    {
      name: "Explore",
      icon: (
        <MdOutlineExplore
          className={pathname === icon[1] && "active_icon"}
          fontSize={20}
        />
      ),
      path: "/all-blogs",
    },
    {
      name: "Profile",
      icon: (
        <AiOutlineUser
          className={pathname === icon[2] && "active_icon"}
          size={20}
        />
      ),
      path: "/profile",
    },
    {
      name: "API key",
      icon: (
        <AiOutlinePlus
          className={pathname === icon[3] && "active_icon"}
          size={18}
        />
      ),
      path: "/apikey",
    },
  ];
  return (
    <>
      {ispopUp && <PopupContainer heading="Create a blog details " />}
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
          <button onClick={openModal} className={style.button}>
            <AiOutlinePlus size={20} /> Create Blog
          </button>
          {/* <span>© 2022 easyblog</span> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
