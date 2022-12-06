import React, { useContext } from "react";
import style from "../css/profileheader.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";

import { AiOutlineSetting } from "react-icons/ai";
import { ContexStore } from "../libs/Context";
import axios from "../libs/axios.js";
import { NavLink } from "react-router-dom";
const ProfileHeader = () => {
  const { userData, onlymyblog, modal } = useContext(ContexStore);
  const [user, setUser] = userData;
  const [ispopUp, setispopUp] = modal;
  const [myBlog, setMyBlog] = onlymyblog;

  const logout = async () => {
    let refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    try {
      const res = await axios.delete(
        "user/logout",
        { refreshToken: refreshToken },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const openDialog = () => {
    setispopUp(true);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.empty_box}>
          <h3>
            I write <span>blog</span>{" "}
          </h3>
        </div>
        <div className={style.details}>
          <div className={style.left_details}>
            <div className={style.img_con}>
              <img onClick={openDialog} src={user?.image} alt={user?.name} />
              <div onClick={openDialog}>
                <AiOutlineCamera size={23} className={style.icon} />
              </div>
            </div>

            <div className={style.info}>
              <h2>{user?.name}</h2>
              <p>{myBlog?.length} blog published</p>
              {/* <p>rajeshkhadkaofficial45@gmail.com</p> */}
            </div>
          </div>
          <div className={style.right_details}>
            <NavLink to="/apikey">
              <button>
                <AiOutlineSetting size={18} />
                Edit Credientials
              </button>
            </NavLink>
            <button onClick={logout}>
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
