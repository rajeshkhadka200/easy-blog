import React, { useContext } from "react";
import style from "../css/profileheader.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { ContexStore } from "../libs/Context";
import axios from "../libs/axios.js";
const ProfileHeader = () => {
  const { userData, onlymyblog } = useContext(ContexStore);
  const [user, setUser] = userData;
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
      console.log(res.data.msg);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
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
            <img src={user?.image} alt={user[0]?.user?.name} />
            <div className={style.info}>
              <h2>{user?.name}</h2>
              <p>{myBlog?.length} blog published</p>
              {/* <p>rajeshkhadkaofficial45@gmail.com</p> */}
            </div>
          </div>
          <div className={style.right_details}>
            <button>
              <AiOutlineSetting size={18} />
              Edit Credientials
            </button>
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
