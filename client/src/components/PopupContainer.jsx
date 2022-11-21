import React from "react";
import popupCon from "../css/popupcontainer.module.css";
import ChooseMedium from "../components/Choosemedium";
const PopupContainer = ({ heading }) => {
  const pathname = window.location.pathname.replace("/", "");
  return (
    <>
      <div className={popupCon.popup_overlay_container}>
        <div className={popupCon.actual_popup}>
          <div className={popupCon.header}>
            <h4>{heading}</h4>
            <span>close</span>
          </div>
          {pathname === "markdown" && <ChooseMedium />}
        </div>
      </div>
    </>
  );
};

export default PopupContainer;
