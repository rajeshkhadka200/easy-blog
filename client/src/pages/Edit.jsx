import axios from "../libs/axios.js";
import React, { useContext, useEffect, useState } from "react";
import style from "../css/markdown.module.css";
import { BiImageAdd } from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import { useParams } from "react-router-dom";

// for markdown
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import { ContexStore } from "../libs/Context.jsx";
import Loading from "../components/Loading.jsx";
import { toast } from "react-toastify";

const Edit = () => {
  // context provider
  const { content, userData } = useContext(ContexStore);
  const [blog, setisBlog] = content;

  const [user] = userData;
  const { blogid } = useParams();

  const [fromDB, setfromDB] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`/blog/getblogbyid/${blogid}`);
      setisBlog({
        ...blog,
        ["title"]: res.data.title,
        ["markdown"]: res.data.markdown,
        ["cover"]: res.data.cover,
        ["_id"]: res.data._id,
        ["published_on"]: res.data.published_on,
      });
      setfromDB(res.data);
    };
    fetchBlog();
  }, []);

  function handleEditorChange({ html, text }) {
    //set blog content
    setisBlog({
      ...blog,
      ["markdown"]: text,
    });
  }
  function handleEditorChange({ html, text }) {
    //set blog content
    setisBlog({
      ...blog,
      ["markdown"]: text,
    });
  }

  const handleBlog = (e) => {
    setisBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setloading] = useState(false);
  const updatePost = async () => {
    setloading(true);
    try {
      const res = await axios.patch("/blog/update", {
        blog,
        api_token: user.api_token,
        remote_id: {
          hashid: fromDB.remote_id.hashnode,
          devid: fromDB.remote_id.dev,
          mongoid: fromDB._id,
        },
      });
      if (res.status === 200) {
        setloading(false);
        toast.success("Updated successfully");
        window.location.href = "/app";
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Unable to update blog");
    }
  };

  return (
    <>
      <div className={style.markdownCon}>
        <img src={fromDB.cover} />
        <div className={style.header}>
          <div className={style.btnGrp}>
            <div id={style.addbtn_edit} className={style.addBtn}>
              <BiImageAdd size={20} />
              Update Cover
            </div>
          </div>

          <button
            id={loading && "not_allowed"}
            disabled={loading}
            onClick={updatePost}
          >
            {loading ? (
              <>
                Updating &nbsp; <Loading size={18} />
              </>
            ) : (
              <>
                <CiShare1 fontSize={20} />
                Update
              </>
            )}
          </button>
        </div>
        {/* input */}
        <div className={style.title}>
          <textarea
            placeholder="Article title ..."
            id="text"
            name="title"
            rows="2"
            cols="50"
            onChange={handleBlog}
            value={blog.title}
          ></textarea>
        </div>
        {/* actual markdown */}
        <MdEditor
          value={blog.markdown}
          name="markdown"
          style={{ height: "385px" }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
        />
      </div>
    </>
  );
};

export default Edit;
