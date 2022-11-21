import React, { useState, useContext } from "react";
import { ContexStore } from "../context/Context";
import style from "../css/choosemedium.module.css";
const ChooseMedium = () => {
  //context provider
  const { modal } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;

  // state for platform selection
  const [platform, setplatform] = useState({
    hashnode: false,
    dev: true,
  });

  // function to handle platform selection
  const onToggle = (e) => {
    setplatform({
      ...platform,
      [e.target.name]: !platform[e.target.name],
    });
  };

  // handle the popup
  const close = () => {
    setispopUp(!ispopUp);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.platform}>
          <span>Hashnode</span>
          <label className={style.toggle_switch}>
            <input
              name="hashnode"
              type="checkbox"
              checked={platform.hashnode}
              onChange={onToggle}
            />
            <span className={style.switch} />
          </label>
        </div>
        <div className={style.platform}>
          <span>Dev.to</span>
          <label className={style.toggle_switch}>
            <input
              name="dev"
              type="checkbox"
              checked={platform.dev}
              onChange={onToggle}
            />
            <span className={style.switch} />
          </label>
        </div>

        <div className={style.btnGrp}>
          <button onClick={close}>Cancel</button>
          <button>Post</button>
        </div>
      </div>
    </>
  );
};

export default ChooseMedium;
