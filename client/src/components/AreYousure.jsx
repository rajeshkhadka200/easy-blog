import React, { useContext, useState } from "react";
import style from "../css/areyousure.module.css";
import { ContexStore } from "../libs/Context";
import Loading from "./Loading";
import axios from "../libs/axios.js";
import { toast } from "react-toastify";
const AreYousure = () => {
  const { modal, userData, dltids, onlymyblog, commBlog } =
    useContext(ContexStore);
  const [user, setuser] = userData;
  const [ispopUp, setispopUp] = modal;
  const [ids, setids] = dltids;
  const [myBlog, setMyBlog] = onlymyblog;
  const [allBlog, setallBlog] = commBlog;

  const close = () => {
    setispopUp(!ispopUp);
    document.body.style.overflow = "auto";
  };

  const [loadingDelete, setloadingDelete] = useState(false);
  const deletePost = async () => {
    setloadingDelete(true);
    const { hashblogid, mongoblogid } = ids;
    const hashnode_authorization = user.api_token.hashnode_authorization;
    try {
      console.log(user?.api_token.hashnode_authorization);
      const res = await axios.delete(
        `/blog/delete/${hashblogid}/${ids.mongoblogid}/${hashnode_authorization}`
      );
      if (res.status === 200) {
        setMyBlog((prev) => {
          return prev.filter((post) => {
            return post._id !== mongoblogid;
          });
        });
        setallBlog((prev) => {
          return prev.filter((post) => {
            return post._id !== mongoblogid;
          });
        });
        setispopUp(!ispopUp);
        setloadingDelete(false);
        toast.success("Blog deleted ");
      }
    } catch (error) {
      toast.error("Unable to delete blog ");
      setloadingDelete(false);
      console.log(error);
    }
  };

  return (
    <div className={style.content}>
      <p>Deleting this blogpost will automatically delete</p>
      <span>in hashnode but not in dev !</span>

      <div className={style.btnGrp}>
        <button
          id={loadingDelete && "not_allowed"}
          disabled={loadingDelete}
          onClick={close}
        >
          Cancel
        </button>
        <button
          id={loadingDelete && "not_allowed"}
          disabled={loadingDelete}
          onClick={deletePost}
        >
          {loadingDelete ? <Loading size={18} /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default AreYousure;
