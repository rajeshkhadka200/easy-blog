import React from "react";
import style from "../css/dashBoardcard.module.css";
const DashBoardcard = () => {
  return (
    <>
      <div className={style.dash_card}>
        <div className={style.left}>
          <h3>Meet my latest project - Realtime code collaboration tool</h3>
          <p>
            Collab is a Realtime code sync tool where one user can collaborate
            with any other user to write code at the with any other user to
            write code at the
          </p>
        </div>
        <div className={style.right}>
          <img
            src="https://blog.rajeshkhadka.info.np/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1662197975991%2FJMSSoi4TI.png%3Fw%3D1600%26h%3D840%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=1920&q=75"
            alt="blog"
          />
        </div>
      </div>
    </>
  );
};

export default DashBoardcard;
