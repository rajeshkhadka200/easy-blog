import React, { useState, useEffect, useContext } from "react";
import style from "../css/table.module.css";
import axios from "../libs/axios";
import { ContexStore } from "../libs/Context";
import Row from "./Row";
import TableHeading from "./TableHeading";
const Table = () => {
  // context provider
  const { userData } = useContext(ContexStore);
  const [user, setuser] = userData;
  const [myBlog, setMyBlog] = useState([]);
  useEffect(() => {
    if (user) {
      getMyBlog();
    }
  }, [user._id]);

  const getMyBlog = async () => {
    const res = await axios.get(`/user/getmyblog/${user._id}`);
    setMyBlog(res.data);
  };

 

  return (
    <>
      <div className={style.table}>
        <TableHeading />
        {/* single row of table */}
        {myBlog.map((blog) => {
          return <Row key={blog._id} blog={blog} />;
        })}
      </div>
    </>
  );
};

export default Table;
