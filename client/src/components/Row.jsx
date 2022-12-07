import React, { useContext } from "react";
import style from "../css/row.module.css";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { SiHashnode } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../libs/axios.js";
import { ContexStore } from "../libs/Context";
import { toast } from "react-toastify";

const Row = ({ blog, sn }) => {
  // context provider
  const { userData, onlymyblog, commBlog } = useContext(ContexStore);
  const [user, setuser] = userData;
  const [myBlog, setMyBlog] = onlymyblog;
  const [allBlog, setallBlog] = commBlog;

  const redirect = "/edit/" + blog._id;
  const hashblogid = blog.remote_id.hashnode;
  const mongoblogid = blog._id;
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `/blog/delete/${hashblogid}/${mongoblogid}`,
        {
          hashnode_authorization: user?.api_token.hashnode_authorization,
        }
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

        toast.success("Blog deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.row}>
      <div className={style.sn}>{sn + 1}</div>
      <div className={style.title}>
        <div className={style.blogCover}>
          <img src={blog.cover} alt="not_found" />
        </div>
        <div className={style.blogTitle}>{blog?.title}</div>
      </div>
      <div className={style.readOn}>
        <SiHashnode className={style.hashnode} />
        <img
          onClick={() => {
            window.open(blog?.original_link, "_blank");
          }}
          className={style.dev}
          src="/dev.svg"
        />
      </div>
      <div className={style.added_date}>{blog?.published_on}</div>

      <div className={style.action}>
        <div className={style.dlt}>
          <MdDelete aria-disabled onClick={deletePost} size={27} />
        </div>
        <NavLink to={redirect}>
          <AiTwotoneEdit fontSize={27} />
        </NavLink>
      </div>
    </div>
  );
};

export default Row;
