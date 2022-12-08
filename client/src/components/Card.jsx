import React from "react";
import style from "../css/card.module.css";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
const Card = ({ blog }) => {
  return (
    <>
      <div className={style.card}>
        <img src={blog?.cover} alt="img" />
        <div className={style.card_body}>
          <div className={style.tittle_header}>
            <img src={blog?.published_by} />
            <p>{blog?.title}</p>
          </div>
          <div className={style.bottom}>
            <span>{blog?.published_on}</span>
            <span>
              <HiArrowTopRightOnSquare size={15} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
