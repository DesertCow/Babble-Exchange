const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");
const authRoutes = require("./routes/auth");
const app = express();
const messageRoutes = require("./routes/messages");
const path = require('path');
require('dotenv').config();


app.use(cors({ origin: process.env.CurrentHost }));
app.use(express.json());

console.log("CORS = " + process.env.MONGO_URL)

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

//* Share Build output directory
app.use(express.static(path.join(__dirname, '../public/build')))
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const server = app.listen(process.env.PORT || 3001, () => {
  // console.log(`Server Hosted on Port ${process.env.PORT}`)
  console.log(`| 🚀  Live API: \x1b[34mhttp://localhost:${process.env.PORT}/api\x1b[0m 🚀 |`);
})

const io = socket(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: process.env.CurrentHost,
    credentials: true,
  },
});

// global.onlineUsers = new Map();
const onlineUsers = new Map()
let socketCount = 0;

io.on("connection", (socket) => {

  console.log("New Socket Connection: " + socket.id);
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    socketCount++;
  });

  socket.on('disconnect', (data) => {
    console.log(`${socket.id} disconnected`);
    onlineUsers.delete(socket.id) // delete socket from Map object
    socketCount--;
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

  console.log("Socket Count = " + socketCount);

});