import React from "react";
import style from "../css/table.module.css";

import Row from "./Row";
import TableHeading from "./TableHeading";
const Table = () => {
  return (
    <>
      <div className={style.table}>
        <TableHeading />
        {/* single row of table */}
        <Row />
        <Row />
      </div>
    </>
  );
};

export default Table;
