import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  let id = localStorage.getItem("accessToken");
  return (
    <>
      <div className={style.hero}>
        <div className={style.left}>
          <h2>Write once, share to many </h2>
          <p>
            Introducing <span>Easy blog</span>, a platform from where you can
            easily post your blogpost to diffrent blogging platforms (dev,
            hashnode) at once.
          </p>
          <div className={style.btn}>
            {id ? (
              <button
                onClick={() => {
                  navigate("/app");
                }}
              >
                Go to dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/watch?v=Q7AOvWpIVHU",
                    "_blank"
                  );
                }}
              >
                Watch video
              </button>
            )}

            {/* <button>View on github</button> */}
          </div>
        </div>
        <div className={style.right}>
          <div className={style.box}>
            <img src="/hero.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
