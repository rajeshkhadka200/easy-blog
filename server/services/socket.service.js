export const join = (socket, getAllClients, usersinSocket, io) => {
  socket.on("join", ({ username, room_id }) => {
    usersinSocket[socket.id] = username;
    socket.join(room_id);
    const allClients = getAllClients(room_id);
    allClients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        allClients,
        username,
        socketId: socket.id,
      });
    });
  });
};
