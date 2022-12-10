import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import DashBoardHeader from "../components/DashBoardHeader";
import similarStyle from "../css/dashboard.module.css";
import Card from "../components/Card";
import NoBlog from "../components/NoBlog";
import { Navigate } from "react-router-dom";
import { ContexStore } from "../libs/Context";
import Loading from "../components/Loading";
const Community = () => {
  const { commBlog, commLoader, search } = useContext(ContexStore);
  const [searchBlog, setsearchBlog] = search;
  const [allBlog] = commBlog;
  const [isloadingAllblog, setisloadingAllblog] = commLoader;
  let id = localStorage.getItem("accessToken");
  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="sidebar_con">
      <Sidebar />
      <div className={similarStyle.dash_right_side_content}>
        <DashBoardHeader title="Community Post" />
        {isloadingAllblog && (
          <div id="loading_div">
            <Loading size={50} />
          </div>
        )}
        <div className={similarStyle.card_con}>
          {allBlog.length === 0 && isloadingAllblog === false && <NoBlog />}
          {!isloadingAllblog &&
            allBlog.map((blog) => {
              return <Card key={blog._id} blog={blog} />;
            })}

          {searchBlog.length > 0 &&
            searchBlog.map((blog) => {
              return <Card key={blog._id} blog={blog} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Community;
