import React, { useContext, useState, useEffect } from "react";
import style from "../css/accountinfo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../libs/axios.js";
import { ContexStore } from "../libs/Context";
import { toast } from "react-toastify";
import Loading from "./Loading";

const AccountInfo = () => {
  const [isloading, setisloading] = useState(false);
  // check weather user is login or not
  const navigate = useNavigate();
  const { userData } = useContext(ContexStore);
  const [user, setuser] = userData;

  const [keys, setKeys] = useState({
    dev_apikey: "yNecF91d29yAA3F8SLKbHeDA",
    hashnode_publicationId: "637f63cd0d2fc8df7adde9d2",
    hashnode_authorization: "5131be37-f7e2-4634-9b29-e9660b76bc3a",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeys({ ...keys, [name]: value });
  };
  const handleSubmit = async () => {
    setisloading(true);
    const id = user?._id;
    try {
      const res = await axios.patch(`/user/addkey/${id}`, { keys });
      if (res.status === 200) {
        setTimeout(() => {
          toast.success("Keys added successfully");
          setisloading(false);
          window.location.href = "/app";
        }, 1000);
      }
    } catch (error) {
      setisloading(false);
      toast.error("Unable to add keys");
      // console.log(error);
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
            id={isloading && "not_allowed"}
            disabled={isloading}
            onClick={() => {
              navigate("/app");
            }}
          >
            Cancel
          </button>
          <button
            id={isloading && "not_allowed"}
            disabled={isloading}
            type="button"
            onClick={handleSubmit}
          >
            {isloading ? <Loading size={15} /> : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
