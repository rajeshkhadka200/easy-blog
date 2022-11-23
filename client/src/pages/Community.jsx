import React from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import Card from "../components/Card";
const Community = () => {
  return (
    <div className="sidebar_con">
      <Sidebar />
      <div className={similarStyle.dash_right_side_content}>
        <DashBoardHeader title="Community Post" />
        <div className={similarStyle.card_con}>
          <Card />
          <Card />
          <Card />
          <Card />

        </div>
      </div>
    </div>
  );
};

export default Community;
