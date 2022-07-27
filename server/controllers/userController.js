const User = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.login = async (req, res, next) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user)
    return res.json({ msg: "Invalid Username", status: false });

  //* Username Found, now compare against expected password  
  const passValid = await bcrypt.compare(password, user.password);

  if (!passValid)
    return res.json({ msg: "Invalid Password", status: false })

  // TODO: delete user.password;

  return res.json({ status: true, user });

};

module.exports.logOut = (req, res, next) => {

  if (!req.params.id)
    return res.json({ msg: "Invalid or Missing UserID" });

  // onlineUsers.delete(req.params.id);
  console.log("LOG OUT HERE... ");
  return res.status(200).send();
};

module.exports.getAllUsers = async (req, res, next) => {

  //* Returns all users but the user that requested??
  const users = await User.find({ _id: { $ne: req.params.id } }).select([
    "email",
    "username",
    "_id",
  ]);
  return res.json(users);

};

module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  //* Search Database to confirm user does not exist
  const userExists = await User.findOne({ username });
  if (userExists)
    return res.json({ msg: "User Already Exists", status: false });

  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.json({ msg: "Email already associated with an account", status: false });

  //* Hash user submitted password
  const hashedPassword = await bcrypt.hash(password, 10);

  //* Create new user in database
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  // delete user.password;
  //* Return User that has been created
  return res.json({ status: true, user });
};