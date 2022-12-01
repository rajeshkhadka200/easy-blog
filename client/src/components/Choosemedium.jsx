import React, { useState, useContext } from "react";
import { ContexStore } from "../libs/Context";
import style from "../css/choosemedium.module.css";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
const ChooseMedium = () => {
  const navigate = useNavigate();
  //context provider
  const { modal, content, userData } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;
  const [blog, setisBlog] = content;
  const [user] = userData;

  // state for platform selection
  const [platform, setplatform] = useState({
    hashnode: true,
    dev: false,
  });

  // function to handle platform selection
  const onToggle = (e) => {
    setplatform({
      ...platform,
      [e.target.name]: !platform[e.target.name],
    });
    // setIs blog to post to selected platform only
    setisBlog({
      ...blog,
      post_to: {
        ...blog.post_to,
        [e.target.name]: !blog.post_to[e.target.name],
      },
    });
  };

  // handle the popup
  const close = () => {
    setispopUp(!ispopUp);
    document.body.style.overflow = "auto";
  };

  const postBlog = async () => {
    // all the validations
    const { api_token } = user;
    const { dev_apikey, hashnode_authorization, hashnode_publicationId } =
      api_token;
    if (!dev_apikey || !hashnode_authorization || !hashnode_publicationId) {
      alert("Please add the token first");
      navigate("/apikey");
      return;
    }

    if (blog.title === "") {
      alert("Please enter a title");
      return;
    }
    // check if the user has not selected any platform
    // if (!blog.post_to.hashnode || !blog.post_to.dev) {
    //   alert("Please select a platform");
    //   return;
    // }

    // check if markdown is empty
    if (blog.markdown === "") {
      alert("Please enter some content");
      return;
    }

    // proceed for posting
    try {
      const res = await axios.post("/blog/post", {
        blog,
        user_id: user._id,
      });
      if (res.status === 200) {
        alert("Blog posted successfully");
        setispopUp(false);
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      if (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
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
          <button onClick={postBlog}>Post</button>
        </div>
      </div>
    </>
  );
};

export default ChooseMedium;
