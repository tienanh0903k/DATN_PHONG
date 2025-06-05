import message from "./message.controller";
import payment from "./payment.controller";
import shop from "./shop.controller";
const SocketController = (io: any) => {
  message(io);
  payment(io);
  shop(io);
};
export default SocketController;
