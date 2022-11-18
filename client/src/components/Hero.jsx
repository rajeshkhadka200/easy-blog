import React from "react";
import style from "../css/hero.module.css";
const Hero = () => {
  return (
    <>
      <div className={style.hero}>
        <div className={style.left}>
          <h2>Write once, share to many</h2>
          <p>
            Introducung <span>Easy blog</span>, a platform from where you can
            easily post your blogpost to many platforms at once.
          </p>
          <div className={style.btn}>
            <button>Get started</button>
            {/* <button>View on github</button> */}
          </div>
        </div>
        <div className={style.right}>
          {/* <img src="/hero_img.svg" alt="no img" /> */}
          <div className={style.box}></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
