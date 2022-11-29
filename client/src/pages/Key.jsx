import React from "react";
import PopupContainer from "../components/PopupContainer";
import { Navigate, useLocation } from "react-router-dom";
const Key = () => {
  const location = useLocation();

  return (
    <>
      <PopupContainer heading={"Please Provive your api key"} />
    </>
  );
};

export default Key;
