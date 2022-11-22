import express from "express";
const app = express();
import cors from "cors";
const port = 8000;
import http from "http";
import { Server } from "socket.io";
import { join } from "./services/socket.service.js";
const server = http.createServer(app);
const io = new Server(server);

// middleware
app.use(cors());
app.use(express.json());

// connected users in LocalMemory
const usersinSocket = {};
const getAllClients = (room_id) => {
  return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map(
    (socketId) => {
      return {
        socketId,
        username: usersinSocket[socketId],
      };
    }
  );
};

// triger when the client gets connected to server
io.on("connection", (socket) => {
  console.log("a user connected");
  // join(socket, getAllClients, usersinSocket, io);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
