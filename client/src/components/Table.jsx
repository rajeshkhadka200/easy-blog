import React, { useState, useEffect, useContext } from "react";
import style from "../css/table.module.css";
import axios from "../libs/axios";
import { ContexStore } from "../libs/Context";
import Loading from "./Loading";
import NoBlog from "./NoBlog";
import Row from "./Row";
import TableHeading from "./TableHeading";
const Table = () => {
  // context provider
  const { onlymyblog, loadingLocally } = useContext(ContexStore);
  const [isloding] = loadingLocally;
  const [myBlog] = onlymyblog;

  return (
    <>
      <div className={style.table}>
        {myBlog.length > 0 && <TableHeading />}
        {isloding && (
          <div id="loading_div">
            <Loading size={50} />
          </div>
        )}
        {/* single row of table */}
        {myBlog.length === 0 && isloding === false && <NoBlog />}
        {!isloding &&
          myBlog.map((blog, i) => {
            return <Row key={blog._id} blog={blog} sn={i} />;
          })}
      </div>
    </>
  );
};

export default Table;
