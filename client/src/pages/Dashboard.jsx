import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import style from "../css/dashboard.module.css";
import Table from "../components/Table";
import DashBoardHeader from "../components/DashBoardHeader";
import { Navigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
import PopupContainer from "../components/PopupContainer";

const Dashboard = () => {
  let id = localStorage.getItem("accessToken");

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const { modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;
  return (
    <>
      {ispopUp && <PopupContainer heading={"Are you sure ?"} />}
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
