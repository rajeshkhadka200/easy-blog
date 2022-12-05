import React, { useState, useEffect, useContext } from "react";
import style from "../css/table.module.css";
import axios from "../libs/axios";
import { ContexStore } from "../libs/Context";
import Row from "./Row";
import TableHeading from "./TableHeading";
const Table = () => {
  // context provider
  const { userData,onlymyblog } = useContext(ContexStore);
  const [myBlog, setMyBlog] = onlymyblog;

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
