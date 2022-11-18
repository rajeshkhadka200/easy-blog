import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
// css and files
import styles from "../css/nav.module.css";
import { useState } from "react";
const Nav = () => {
  const [isLogin, setisLogin] = useState(true);
  return (
    <>
      <nav>
        <div className={styles.logo}>
          <Link to="/">Logo</Link>
        </div>
        <div className={styles.links}>
          {isLogin ? (
            <img
              src="https://avatars.githubusercontent.com/u/69001910?v=4"
              alt="user-not-found"
            />
          ) : (
            <div className={styles.login}>
              <AiFillGithub size={30} />
              <span>Login</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
