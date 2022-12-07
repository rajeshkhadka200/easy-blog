import React from "react";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import style from "../css/footer.module.css";
const Footer = () => {
  let footerIcon = [
    {
      icon: <AiFillTwitterSquare fontSize={20} />,
      link: "https://twitter.com/rajeshkhadka200",
    },
    {
      icon: <AiFillInstagram fontSize={20} />,
      link: "https://www.instagram.com/rajeshkhadka200/",
    },
    {
      icon: <AiFillGithub fontSize={20} />,
      link: "https://github.com/rajeshkhadka200",
    },
  ];
  return (
    <footer>
      <div className={style.left}>
        <p>Made with ❤️ by Rajesh Khadka </p>
        <div className={style.social}>
          {footerIcon.map((data, i) => {
            return (
              <a key={i} href={data.link} target={"_blank"}>
                <div key={i} className={style.icon}>
                  {data.icon}
                </div>
              </a>
            );
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
