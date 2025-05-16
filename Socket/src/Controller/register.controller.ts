import { Socket } from "socket.io";
import { registerSocket, unregisterSocket } from "../services/registerService";

const handleLogin = (socket: Socket) => {
  socket.on("registerUser", (userId: string) => {
    registerSocket(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });
  socket.on("disconnect", () => {
    unregisterSocket(socket.id);
    console.log(`User disconnected with socket ${socket.id}`);
  });
};

export default handleLogin;
