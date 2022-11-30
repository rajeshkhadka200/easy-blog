import React, { useContext, useState, useEffect } from "react";
import style from "../css/accountinfo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../libs/axios.js";
import { ContexStore } from "../libs/Context";

const AccountInfo = () => {
  // check weather user is login or not
  const navigate = useNavigate();
  const { userData } = useContext(ContexStore);
  const [user, setuser] = userData;

  const [keys, setKeys] = useState({
    dev_apikey: "152",
    hashnode_publicationId: "12252",
    hashnode_authorization: "1525",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeys({ ...keys, [name]: value });
  };
  const handleSubmit = async () => {
    const id = user?._id;
    try {
      const res = await axios.patch(`/user/addkey/${id}`, { keys });
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/app");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.content}>
        <div className={style.dev}>
          <p>Dev's api key ?</p>
          <input
            name="dev_apikey"
            onChange={handleChange}
            required
            type="text"
            placeholder="api key"
            value={keys.dev_apikey}
          />
        </div>
        <div className={style.hashnode}>
          <div className={style.publication}>
            <p>Hashnode's publication id ?</p>
            <input
              name="hashnode_publicationId"
              onChange={handleChange}
              required
              type="text"
              placeholder="publicayion key"
              value={keys.hashnode_publicationId}
            />
          </div>
          <div className={style.publication}>
            <p>Hashnode's Authorization token ?</p>
            <input
              name="hashnode_authorization"
              onChange={handleChange}
              required
              type="text"
              placeholder="Authorization token"
              value={keys.hashnode_authorization}
            />
          </div>
        </div>
        <div className={style.btnGrp}>
          <button
            onClick={() => {
              navigate("/app");
            }}
          >
            Cancel
          </button>
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
