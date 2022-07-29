const User = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.login = async (req, res, next) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  // console.log("Login Request from " + username + " ||" + password + " ||| " + user);

  console.log("\n\x1b[33mLogin Request\x1b[0m\n   User: \x1b[33m" + username + "\x1b[0m\n   Password: \x1b[35m" + password + "\x1b[0m");

  if (!user) {
    console.log("\x1b[35mLogin Failed\x1b[0m");
    return res.json({ msg: "Invalid Username", status: false });
  }

  //* Username Found, now compare against expected password  
  const passValid = await bcrypt.compare(password, user.password);

  // console.log("PassValid = " + passValid);

  if (!passValid) {
    console.log("\x1b[35mLogin Failed\x1b[0m");
    return res.json({ msg: "Invalid Password", status: false })
  }

  // TODO: delete user.password;
  // navigate(`/Chat`);

  console.log("\x1b[32mLogin Successful\x1b[0m");
  return res.json({ status: true, user });

};

module.exports.logOut = (req, res, next) => {

  console.log("\n\x1b[33mLogout Request\x1b[0m\n   User ID: \x1b[33m" + req.params.id + "\x1b[0m");

  if (!req.params.id)
    return res.json({ msg: "Invalid or Missing UserID" });

  // onlineUsers.delete(req.params.id);
  console.log("\x1b[32mLogout Successful\x1b[0m");
  // return res.status(200).send();
  return res.status(200).json({ message: "User [" + req.params.id + "] has been logged out... Goodbye!", status: 200 })
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
  // const { username, email, password } = req.body;
  const { username, password, email } = req.body;

  console.log("\n\x1b[33mCreate New User\x1b[0m\n   User: \x1b[33m" + username + "\x1b[0m\n   Password: \x1b[35m" + password + "\x1b[0m\n   Email: " + email);

  //* Search Database to confirm user does not exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    console.log("\x1b[35mAccount Creation Failed: User Already Exists\x1b[0m");
    return res.json({ msg: "User Already Exists", status: false });
  }


  const emailExists = await User.findOne({ email });
  if (emailExists) {
    console.log("\x1b[35mAccount Creation Failed: Email already associated with an account \x1b[0m");
    return res.json({ msg: "Email already associated with an account", status: false });
  }
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
  console.log("\x1b[32mAccount Creation Successful\x1b[0m");
  return res.json({ status: true, user });
};