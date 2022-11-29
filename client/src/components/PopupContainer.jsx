import React, { useContext } from "react";
import popupCon from "../css/popupcontainer.module.css";
import ChooseMedium from "../components/Choosemedium";
import { IoMdClose } from "react-icons/io";
import { ContexStore } from "../libs/Context";
import GenerateBlogInfo from "./GenerateBlogInfo";
import AccountInfo from "./AccountInfo";
import { useNavigate } from "react-router-dom";
const PopupContainer = ({ heading }) => {
  // usnavigate
  const navigate = useNavigate();

  // context provider
  const { modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;

  const pathname = window.location.pathname.replace("/", "");

  // close popup
  const closeModal = () => {
    if (pathname === "apikey") {
      console.log("hello");
      return navigate("/");
    }
    document.body.style.overflow = "auto";
    setispopUp(!ispopUp);
  };

  let pages = ["app", "profile", "all-blogs"];
  const checkPages = () => {
    if (pages.includes(pathname)) {
      return true;
    }
    return false;
  };
  const isPage = checkPages();
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
          {isPage && <GenerateBlogInfo />}
          {pathname === "apikey" && <AccountInfo />}
        </div>
      </div>
    </>
  );
};

export default PopupContainer;
