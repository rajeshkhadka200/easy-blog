import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../libs/axios.js";

// css and files
import styles from "../css/nav.module.css";
import { FaDribbble } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

// login imports
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { ContexStore } from "../libs/Context.jsx";
import { toast } from "react-toastify";

const Nav = () => {
  const { userData } = useContext(ContexStore);
  const [user, setUser] = userData;

  let toks = localStorage.getItem("accessToken");
  // use navigate

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const clientId = import.meta.env.VITE_APP_CLIENT_ID;

  const onFailure = (err) => {
    if (err.details === "Cookies are not enabled in current environment.") {
      alert("Please enable cookies");
    }
  };

  // onsuccess
  const onSuccess = async (data) => {
    const { profileObj } = data;
    try {
      const res = await axios.post("/user/auth", {
        name: profileObj.name,
        email: profileObj.email,
        image: profileObj.imageUrl,
      });
      const { accessToken, refreshToken, _id, id } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (id) {
        localStorage.setItem("_id", id);
      } else {
        localStorage.setItem("_id", _id);
      }
      // alert(res.data.message);
      toast.success("Login successfully");
      window.location.href = "/app";
    } catch (error) {
      toast.error("Unable to login please try again");
      console.log(error);
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    onFailure,
  });
  return (
    <>
      <nav>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.brand}>
              <FaDribbble />
            </span>
            Easy Blog
          </Link>
        </div>
        <div className={styles.links}>
          {toks ? (
            <Link to={"/app"}>
              <img src={user?.image} alt="" />
            </Link>
          ) : (
            <div onClick={signIn} className={styles.login}>
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
