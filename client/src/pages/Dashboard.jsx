import React from "react";
import Sidebar from "../components/Sidebar";
import style from "../css/dashboard.module.css";
import Table from "../components/Table";

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
          <div className={style.after_border}></div>
          {/* render the cards */}
          <div className={style.dash_card_con}>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
