import React from "react";
import style from "../css/generateroom.module.css";
const GenerateBlogInfo = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.form}>
          <input type="text" placeholder="Blog id - 152ds5251d5s" />
          <input type="text" placeholder="username" />
        </div>
        <div className={style.btnGrp}>
          <button>Create</button>
        </div>
      </div>
    </>
  );
};

export default GenerateBlogInfo;
