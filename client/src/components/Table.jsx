import React, { useState, useEffect, useContext } from "react";
import style from "../css/table.module.css";
import axios from "../libs/axios";
import { ContexStore } from "../libs/Context";
import NoBlog from "./NoBlog";
import Row from "./Row";
import TableHeading from "./TableHeading";
const Table = () => {
  // context provider
  const { onlymyblog, loadingLocally } = useContext(ContexStore);
  const [isloding, setisloding] = loadingLocally;
  const [myBlog, setMyBlog] = onlymyblog;

  return (
    <>
      <div className={style.table}>
        {myBlog.length > 0 && <TableHeading />}
        {isloding ? "Loading" : ""}
        {/* single row of table */}
        {myBlog.length === 0 && isloding === false && <NoBlog />}
        {myBlog.map((blog) => {
          return <Row key={blog._id} blog={blog} />;
        })}
      </div>
    </>
  );
};

export default Table;
