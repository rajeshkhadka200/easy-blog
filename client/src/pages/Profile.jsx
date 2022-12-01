import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import ProfileHeader from "../components/ProfileHeader";
import { Navigate, useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
const Profile = () => {
  const { userData } = useContext(ContexStore);
  const [user, setuser] = userData;
  const navigate = useNavigate();
  let id = localStorage.getItem("accessToken");

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sidebar_con">
      <Sidebar />
      <div className={similarStyle.dash_right_side_content}>
        <DashBoardHeader title="Rajesh Khadka" />
        <ProfileHeader />
      </div>
    </div>
  );
};

export default Profile;
