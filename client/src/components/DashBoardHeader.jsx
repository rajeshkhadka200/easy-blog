import React, { useContext, useState } from "react";
import style from "../css/dashboardHeader.module.css";
import axios from "../libs/axios";
import { ContexStore } from "../libs/Context";
const DashBoardHeader = ({ title }) => {
  const { search } = useContext(ContexStore);
  const [searchBlog, setsearchBlog] = search;
  const [query, setQuery] = useState("");

  const pathname = window.location.pathname.replace("/", "");

  const fireSearch = async () => {
    try {
      const res = await axios.get(`/blog/search/${query}`);
      if (res.status === 200) {
        setsearchBlog(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={style.header}>
        <h3>{title}</h3>
        {pathname != "profile" && pathname !== "app" ? (
          <div className={style.search}>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="search blog title"
            />
            <button onClick={fireSearch}>search</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={style.after_border}></div>
    </>
  );
};

export default DashBoardHeader;
