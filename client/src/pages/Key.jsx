import React, { useContext, useEffect } from "react";
import PopupContainer from "../components/PopupContainer";
import { Navigate, useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
import { toast } from "react-toastify";
const Key = () => {
  const navigate = useNavigate();
  let id = localStorage.getItem("accessToken");

  if (!id) {
    return <Navigate to="/" replace />;
  }
  useEffect(() => {
    toast.info("Save as it is if you don't have any api key");
  }, []);
  return (
    <>
      <PopupContainer heading={"Please Provive your api key"} />
    </>
  );
};

export default Key;
