import React, { useContext, useState } from "react";
import style from "../css/uploadimg.module.css";
import { ContexStore } from "../libs/Context";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "../libs/axios.js";
const GenerateBlogInfo = () => {
  //context provider
  const { userData } = useContext(ContexStore);
  const [user, setuser] = userData;

  const [avatar, setAvatar] = useState({
    url: "",
    file: "",
  });

  const openDialog = () => {
    let input = document.createElement("INPUT");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", (e) => {
      setAvatar({
        ...avatar,
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    });
  };

  const uploadImage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const fd = new FormData();
      fd.append("profile", avatar.file);
      const res = await axios.patch(
        `/image/changeprofile/${user._id}`,
        fd,
        config
      );
      window.location.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.body}>
          {avatar.url ? (
            <img src={avatar?.url} alt="username" />
          ) : (
            <div onClick={openDialog} className={style.dotted}>
              <AiOutlineUpload fill="rgba(128, 128, 128, 0.651)" size={70} />
            </div>
          )}
        </div>
        <div className={style.btnGrp}>
          {avatar?.url && (
            <button
              onClick={() => {
                setAvatar({
                  url: "",
                  file: "",
                });
              }}
              className={style.remove_btn}
            >
              Remove image
            </button>
          )}
          <button onClick={uploadImage}>Change</button>
        </div>
      </div>
    </>
  );
};

export default GenerateBlogInfo;
