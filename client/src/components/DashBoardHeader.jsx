import React from "react";
import style from "../css/dashboardHeader.module.css";

const DashBoardHeader = ({ title }) => {
  const pathname = window.location.pathname.replace("/", "");

  return (
    <>
      <div className={style.header}>
        <h3>{title}</h3>
        {pathname != "profile" && pathname !== "app" ? (
          <div className={style.search}>
            <input type="text" placeholder="search blog title" />
            <button>search</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={style.after_border}></div>
    </>
  );
};

export default DashBoardHeader;
