const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {

  const { sender, recipient } = req.body;

  console.log("\n\x1b[33mConversation Request \x1b[0m\n   From: \x1b[35m" + sender + "\x1b[0m \n   To  : \x1b[36m" + recipient + "\x1b[0m");

  const messages = await Messages.find({
    users: {
      $all: [sender, recipient],
    },
  }).sort({ updatedAt: 1 });

  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: String(msg.sender) === sender,
      message: msg.message.text,
    };
  });

  if (!projectedMessages) {
    console.log("\x1b[35mFailed to Retrive Conversation!\x1b[0m");
  }

  console.log("\x1b[32mConversation Retrived Successfully\x1b[0m");
  res.json(projectedMessages);

};

module.exports.addMessage = async (req, res, next) => {

  const { recipient, sender, message } = req.body;

  console.log("\n\x1b[33mMessage Send Request \x1b[0m\n   From: \x1b[35m" + sender + "\x1b[0m \n   To  : \x1b[36m" + recipient + "\x1b[0m\n   Msg : \x1b[32m" + message + "\x1b[0m");
  const data = await Messages.create({
    message: { text: message },
    users: [sender, recipient],
    sender: sender,
  });

  if (data) {
    console.log("\x1b[32mMessage Sent\x1b[0m");
    return res.json({ msg: "Message added successfully." });
  }
  else {
    console.log("\x1b[31mMessage Failed to Send\x1b[0m");
    return res.json({ msg: "Failed to add message to the database" });
  }

};