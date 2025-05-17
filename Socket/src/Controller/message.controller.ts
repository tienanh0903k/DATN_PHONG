import handleLogin from "./register.controller";

const message = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("sendMessage", (data: any) => {
      io.emit("receiveMessage", data);
    });
  });
};

export default message;
