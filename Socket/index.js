const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
const socketontroller = require("./src/Controller/socketController");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

module.exports = { io };
const PORT = process.env.PORT || 8000;
socketontroller(io);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
