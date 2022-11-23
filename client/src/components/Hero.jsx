import React from "react";
import style from "../css/hero.module.css";
import PopupContainer from "./PopupContainer";
const Hero = () => {
  return (
    <>
      <div className={style.hero}>
        <div className={style.left}>
          <h2>Write once, share to many  </h2>
          <p>
            Introducung <span>Easy blog</span>, a platform from where you can
            easily post your blogpost to diffrent platforms (dev, hashnode) at once.
          </p>
          <div className={style.btn}>
            <button>Get started</button>
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
