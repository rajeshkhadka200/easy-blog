import React, { useContext, useEffect } from "react";
import PopupContainer from "../components/PopupContainer";
import { useNavigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
const Key = () => {
  const navigate = useNavigate();
  let id = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <PopupContainer heading={"Please Provive your api key"} />
    </>
  );
};

export default Key;
