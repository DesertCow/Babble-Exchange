const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {

  const { from, to } = req.body;

  const messages = await Messages.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });

  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
  });
  res.json(projectedMessages);

};

module.exports.addMessage = async (req, res, next) => {

  const { recipient, sender, message } = req.body;

  console.log("\n\x1b[32mMessage Sent \x1b[0m\n   From: \x1b[35m" + sender + "\x1b[0m \n   To  : \x1b[36m" + recipient + "\x1b[0m\n   Msg : \x1b[32m" + message + "\x1b[0m");
  const data = await Messages.create({
    message: { text: message },
    users: [sender, recipient],
    sender: sender,
  });

  if (data) return res.json({ msg: "Message added successfully." });
  else return res.json({ msg: "Failed to add message to the database" });

};