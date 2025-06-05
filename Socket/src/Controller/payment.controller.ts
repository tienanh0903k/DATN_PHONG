const payment = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("payment", (data: any) => {
      console.log(data);
      io.to(`shop_${data.shopId}`).emit("receivePayment", data);
    });
  });
};

export default payment;
