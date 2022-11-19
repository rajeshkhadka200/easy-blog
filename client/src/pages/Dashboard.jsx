import React from "react";
import DashBoardcard from "../components/DashBoardcard";
import Sidebar from "../components/Sidebar";
import style from "../css/dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <div className="sidebar_con">
        <Sidebar />
        <div className={style.dash_left_side_content}>
          <div className={style.header}>
            <h3>Your Blogpost </h3>
            <div className={style.search}>
              <input type="text" placeholder="search blog title" />
              <button>search</button>
            </div>
          </div>
          {/* render the cards */}
          <div className={style.dash_card_con}>
            <DashBoardcard />
            <DashBoardcard />
            <DashBoardcard />
            <DashBoardcard />
            <DashBoardcard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
