import React from "react";
import style from "../css/features.module.css";
import { CiShare1 } from "react-icons/ci";
const Features = () => {
  const data = [
    {
      icon: <CiShare1 fontSize={25} />,
      title: "Publishing",
      text: "Immediately post articles to blogging platforms like hashnode and dev.to",
    },
    {
      icon: <CiShare1 fontSize={25} />,
      title: "Realtime",
      text: "Use built in video and audio call to communicate with your co-blogger and share your ideas",
    },
    {
      icon: <CiShare1 fontSize={25} />,
      title: "Customaze",
      text: " easily edit and remove your blog, and it will automatically update on other blogging sites.",
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
