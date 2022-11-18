import React from "react";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";

import style from "../css/footer.module.css";
const Footer = () => {
  let icon = [
    <AiFillTwitterSquare fontSize={20} />,
    <AiFillInstagram fontSize={20} />,
    <AiFillGithub fontSize={20} />,
  ];
  return (
    <footer>
      <div className={style.left}>
        <p>Made with ❤️ by Rajesh Khadka </p>
        <div className={style.social}>
          {icon.map((icon, i) => {
            return <div className={style.icon}>{icon}</div>;
          })}
        </div>
      </div>
      <div className={style.right}>
        Special Thanks to :{" "}
        <a target={"_blank"} href="https://dev.to">
          Dev.to{" "}
        </a>
        &{" "}
        <a target={"_blank"} href="https://www.mongodb.com/atlas/database">
          Mongodb atlas
        </a>{" "}
      </div>
    </footer>
  );
};

export default Footer;
