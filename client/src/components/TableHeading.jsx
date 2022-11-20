import React from "react";
import style from "../css/tableHeading.module.css";
const TableHeading = () => {
  return (
    <div className={style.header}>
      <div className={style.count}>S.N</div>
      <div className={style.title}>Title</div>
      <div className={style.action}>Read Article on</div>
      <div className={style.dateAdded}>Created on</div>
      <div className={style.action}>Action</div>
    </div>
  );
};

export default TableHeading;
