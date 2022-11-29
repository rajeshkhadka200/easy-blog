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
    }
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get("/user/getuser", {
        headers: {
          "x-access-token": `${accessToken}`,
        },
      });
      console.log(res);
      setUser(res.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const accessTok = await getAccessToken();
        const res = await axios.get("/getuser", {
          headers: {
            "x-access-token": accessTok,
          },
        });
        setUser([res.data.user]);
      }
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <ContexStore.Provider
        value={{
          modal: [ispopUp, setispopUp],
          userData: [user, setUser],
        }}
      >
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;
