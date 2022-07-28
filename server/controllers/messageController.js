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

  const { sender, user, message } = req.body;
  console.log("########" + sender + '||' + user + '||' + message)
  const data = await Messages.create({
    message: { text: message },
    users: [sender, user],
    sender: sender,
  });

  if (data) return res.json({ msg: "Message added successfully." });
  else return res.json({ msg: "Failed to add message to the database" });

};