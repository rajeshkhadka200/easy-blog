import React, { useState, useRef, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import style from "../css/editor.module.css";
import { initSocketClient } from "../libs/socket.connection";
const Editor = () => {
  const [value, setValue] = useState();

  // initialize the ref for socket
  // const socketRef = useRef(null);
  // useEffect(() => {
  //   async function init() {
  //     socketRef.current = await initSocketClient();

  //     // error handalling
  //     socketRef.current.on("connect_error", (err) => {
  //       handleError(err);
  //     });
  //     socketRef.current.on("connect_failed", (err) => {
  //       handleError(err);
  //     });

  //     const handleError = (err) => {
  //       // alert("failed to connect");
  //       console.log(err);
  //       // toast.error("Failed to connect, Please try again ");
  //     };
  //     // sockets functions
  //     join(socketRef, "shakjhsakjshkja", "rajesh khadka");
  //   }
  //   init();
  // }, []);

  return (
    <>
      <MDEditor
        height={380}
        className={style.editor}
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default Editor;
