import React from "react";
import style from "../css/card.module.css";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
const Card = () => {
  return (
    <>
      <div className={style.card}>
        <img src="/cover.jpeg" alt="img" />
        <div className={style.card_body}>
          <div className={style.tittle_header}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUdSn-b8HMufMqLVrWP3R5U8MCOjvjzkOy9w&usqp=CAU" />
            <p>Introducing JUHU - A real time code collabraton tool.</p>
          </div>
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
