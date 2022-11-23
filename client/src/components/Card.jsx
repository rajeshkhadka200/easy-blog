import React from "react";
import style from "../css/card.module.css";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
const Card = () => {
  return (
    <>
      <div className={style.card}>
        <img src="/cover.jpeg" alt="img" />
        <div className={style.card_body}>
          <p>Introducing JUHU - A real time code collabraton tool.</p>
          <div className={style.bottom}>
            <span>Nov 28, 2022</span>
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
