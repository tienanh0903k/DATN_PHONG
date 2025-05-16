import message from "./message.controller";

const SocketController = (io: any) => {
  message(io);
};
export default SocketController;
