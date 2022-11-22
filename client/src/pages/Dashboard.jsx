import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import style from "../css/dashboard.module.css";
import Table from "../components/Table";
import DashBoardHeader from "../components/DashBoardHeader";
import { ContexStore } from "../libs/Context";

const Dashboard = () => {
  const { modal } = useContext(ContexStore);
  return (
    <>
      <div className="sidebar_con">
        <Sidebar />
        <div className={style.dash_right_side_content}>
          <DashBoardHeader title="Your Blogpost" />

          {/* render the cards */}
          <div className={style.dash_table_con}>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;