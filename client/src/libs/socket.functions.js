export function join(socketRef, room_id, username) {
  console.log("join", room_id, username);
  socketRef.current.emit("join", {
    room_id,
    username,
  });
}
