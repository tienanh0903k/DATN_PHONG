const shop = (io: any) => {
  io.on("connection", (socket: any) => {
    socket.on("shop_join", (shopId: number) => {
      socket.join(`shop_${shopId}`);
      console.log(`Shop ${shopId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log("Shop disconnected");
    });
  });
};

export default shop;
