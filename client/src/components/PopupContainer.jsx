import React, { useContext } from "react";
import popupCon from "../css/popupcontainer.module.css";
import ChooseMedium from "../components/Choosemedium";
import { IoMdClose } from "react-icons/io";
import { ContexStore } from "../context/Context";
import GenerateBlogInfo from "./GenerateBlogInfo";
const PopupContainer = ({ heading }) => {
  // context provider
  const { modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;

  const pathname = window.location.pathname.replace("/", "");

  // close popup
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setispopUp(!ispopUp);
  };
  console.log(pathname);
  return (
    <>
      <div className={popupCon.popup_overlay_container}>
        <div className={popupCon.actual_popup}>
          <div className={popupCon.header}>
            <h3>{heading}</h3>
            <span>
              <IoMdClose
                onClick={closeModal}
                className={StyleSheet.close}
                size={25}
              />
            </span>
          </div>
          {pathname === "markdown" && <ChooseMedium />}
          {pathname !== "markdown" && <GenerateBlogInfo />}
        </div>
      </div>
    </>
  );
};

export default PopupContainer;
