import React from "react";
import style from "../css/choosemedium.module.css";
const ChooseMedium = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.platform}>
          <span>Hashnode</span>
          <span>Toogle</span>
        </div>
        <div className={style.platform}>
          <span>Dev</span>
          <span>Toogle</span>
        </div>

        <div className={style.btnGrp}>
          <button>Cancel</button>
          <button>Done</button>
        </div>
      </div>
    </>
  );
};

export default ChooseMedium;
