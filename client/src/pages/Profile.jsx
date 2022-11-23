import React from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import ProfileHeader from "../components/ProfileHeader";

const Profile = () => {
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
