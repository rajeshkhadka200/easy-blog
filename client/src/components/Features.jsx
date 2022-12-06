import React from "react";
import style from "../css/features.module.css";
import { CiShare1 } from "react-icons/ci";
import { VscEditorLayout } from "react-icons/vsc";
import { AiOutlineSetting } from "react-icons/ai";
const Features = () => {
  const data = [
    {
      icon: <CiShare1 fontSize={25} />,
      title: "Publishing",
      text: "Immediately post articles to blogging platforms like hashnode and dev.to",
    },
    {
      icon: <AiOutlineSetting fontSize={23} />,
      title: "customize",
      text: " easily edit and remove your blog, and it will automatically update on other blogging sites.",
    },
    {
      icon: <VscEditorLayout fontSize={23} />,
      title: "Inbuilt Editor",
      text: "Write your blog in inbuilt markdown editor and publish it to your platform.",
    },
  ];
  return (
    <>
      <div className={style.features}>
        <div className={style.heading}>
          <h2>Features</h2>
        </div>
        <div className={style.card_con}>
          {data.map((data, i) => {
            const { icon, title, text } = data;
            return (
              <div key={i} className={style.card}>
                <div className={style.icon}>{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Features;
