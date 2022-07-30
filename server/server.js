const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const app = express();
const messageRoutes = require("./routes/messages");
require('dotenv').config();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // console.log("DB Connection Successful!")
  console.log(`| 💡     Database Connection:  \x1b[32mOnline\x1b[0m     💡 |`);

}).catch((err) => {
  console.log(err.message);
});

//* Setup API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT || 3001, () => {
  // console.log(`Server Hosted on Port ${process.env.PORT}`)
  console.log(`| 🚀  Live API: \x1b[34mhttp://localhost:${process.env.PORT}/api\x1b[0m 🚀 |`);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});