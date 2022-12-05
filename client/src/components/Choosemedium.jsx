import React, { useState, useContext } from "react";
import { ContexStore } from "../libs/Context";
import style from "../css/choosemedium.module.css";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ChooseMedium = () => {
  const navigate = useNavigate();
  //context provider
  const { modal, content, userData } = useContext(ContexStore);
  const [ispopUp, setispopUp] = modal;
  const [blog, setisBlog] = content;
  const [user] = userData;
  const [link, setlink] = useState("");

  // function to handle platform selection
  const onToggle = (e) => {
    // setIs blog to post to selected platform onlyp
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
      toast.info("Please add the token first");
      navigate("/apikey");
      return;
    }

    if (blog.title === "") {
      toast.info("Please enter a title");
      return;
    }
    // check if the user has not selected any platform
    // if (!blog.post_to.hashnode || !blog.post_to.dev) {
    //   toast.info("Please select a platform");
    //   return;
    // }

    // check if markdown is empty
    if (blog.markdown === "") {
      toast.info("Please enter some content");
      return;
    }
    // for image upload cover
    // declae headers for application/ json and multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // proceed for posting
    const fd = new FormData();
    fd.append("cover", blog.cover);

    // upload cover image
    const coverRes = await axios.post("/image/uploadcover", fd, config);
    console.log(coverRes.data.url);

    if (coverRes.status === 400) {
      toast.error("Error uploading cover image");
      return;
    }

    try {
      const res = await axios.post("/blog/post", {
        blog,
        user_id: user._id,
        cover: coverRes.data.url,
      });
      if (res.status === 200) {
        toast.success("Blog posted successfully");
        setispopUp(false);
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      if (error) {
        // toast.error("Unable to post blog");
        console.log(error);
        // alert(error.response.data.message);
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
              checked={blog.post_to.hashnode}
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
              checked={blog.post_to.dev}
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
