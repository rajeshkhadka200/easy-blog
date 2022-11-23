import React from "react";
import style from "../css/profileheader.module.css";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
const ProfileHeader = () => {
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
            <img
              src="https://scontent.fbwa3-1.fna.fbcdn.net/v/t39.30808-6/270849698_636049147586954_6512254458201320833_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GE1wv1HTct8AX_udy5y&_nc_ht=scontent.fbwa3-1.fna&oh=00_AfAmuUfpIQMQWd25h9SxIHjtZpHYI4NBt_o54ZyLsFx0tg&oe=6382966D"
              alt="usernaem"
            />
            <div className={style.info}>
              <h2>Rajesh Khadka</h2>
              <p>5 blogs published</p>
              {/* <p>rajeshkhadkaofficial45@gmail.com</p> */}
            </div>
          </div>
          <div className={style.right_details}>
            <button>
              <AiOutlineSetting size={18} />
              Edit Credientials
            </button>
            <button>
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
