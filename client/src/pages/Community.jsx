import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
const Community = () => {
  const navigate = useNavigate();
  let id = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!id) {
      return navigate("/");
    }
  }, []);

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
