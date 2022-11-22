import { io } from "socket.io-client";

export const initSocketClient = async () => {
  //   let url = process.env.REACT_APP_SOCKET_URL;
  let url = "https://localhost:8000";
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(url, options);
};
