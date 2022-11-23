import React from "react";
import style from "../css/accountinfo.module.css";
import { useNavigate } from "react-router-dom";
const AccountInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div className={style.content}>
          <div className={style.dev}>
            <p>Dev's api key ?</p>
            <input required type="text" placeholder="api key" />
          </div>
          <div className={style.hashnode}>
            <div className={style.publication}>
              <p>Hashnode's publication id ?</p>
              <input required type="text" placeholder="publicayion key" />
            </div>
            <div className={style.publication}>
              <p>Hashnode's Authorization token ?</p>
              <input required type="text" placeholder="Authorization token" />
            </div>
          </div>
          <div className={style.btnGrp}>
            <button
              type="submit"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </button>

            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountInfo;
