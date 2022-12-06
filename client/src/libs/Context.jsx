import React, { createContext, useState, useEffect } from "react";
export const ContexStore = createContext();
import axios from "../libs/axios.js";
const Context = (props) => {
  const accessToken = localStorage.getItem("accessToken");
  const [ispopUp, setispopUp] = useState(false);
  const [user, setUser] = useState([]);

  const refreshToken = localStorage.getItem("refreshToken");
  const getAccessToken = async () => {
    try {
      if (localStorage.getItem("refreshToken")) {
        const res = await axios.post("/token/refresh", {
          refreshToken: refreshToken,
        });
        if (res) {
          localStorage.setItem("accessToken", res.data.accessToken);
          return res.data.accessToken;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.replace("/");
      }
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("/user/getuser", {
        headers: {
          "x-access-token": `${accessToken}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await axios.get("/getuser", {
          headers: {
            "x-access-token": accessTok,
          },
        });

        setUser(res.data);
      }
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, []);

  // state for fetching blogs locally
  const [isloading, setisloading] = useState(true);
  const id = localStorage.getItem("_id");
  const [myBlog, setMyBlog] = useState([]);
  useEffect(() => {
    if (id) {
      getMyBlog();
    }
  }, []);

  const getMyBlog = async () => {
    const res = await axios.get(`/user/getmyblog/${id}`);
    setMyBlog(res.data);
    setisloading(false);
  };

  const [blog, setisBlog] = useState({
    title: "",
    markdown: "",
    cover: "",
    post_to: {
      hashnode: false,
      dev: false,
    },
    published_on: "",
  });
  return (
    <>
      <ContexStore.Provider
        value={{
          modal: [ispopUp, setispopUp],
          userData: [user, setUser],
          content: [blog, setisBlog], // blog content
          onlymyblog: [myBlog, setMyBlog],
          loadingLocally: [isloading, setisloading],
        }}
      >
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;
