import handleLogin from "./register.controller";

const message = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("join_chat", (data: { customerId: number; shopId: number }) => {
      const roomId = `chat_${data.customerId}_${data.shopId}`;
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("sendMessage", (data: any) => {
      const roomId = `chat_${data.customerId}_${data.shopId}`;
      io.to(roomId).emit("receiveMessage", data);
      console.log(`Message sent to room: ${roomId}`, data);
    });

    socket.on("leave_chat", (data: { customerId: number; shopId: number }) => {
      const roomId = `chat_${data.customerId}_${data.shopId}`;
      socket.leave(roomId);
      console.log(`User left room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default message;
