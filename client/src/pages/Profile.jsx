import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import ProfileHeader from "../components/ProfileHeader";
import { Navigate, useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
import PopupContainer from "../components/PopupContainer";
const Profile = () => {
  //context provider
  const { userData, modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;
  const [user, setuser] = userData;

  let id = localStorage.getItem("accessToken");
  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {ispopUp && <PopupContainer heading="Choose a new image" />}
      <div className="sidebar_con">
        <Sidebar />
        <div className={similarStyle.dash_right_side_content}>
          <DashBoardHeader title={user.name} />
          <ProfileHeader />
        </div>
      </div>
    </>
  );
};

export default Profile;
