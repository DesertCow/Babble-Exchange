const User = require("../models/userModel");
const bcrypt = require("bcrypt");


module.exports.login = async (req, res, next) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  // console.log("Login Request from " + username + " ||" + password + " ||| " + user);

  console.log("\nLogin Request -> User: \x1b[33m" + username + "\x1b[0m || Password = \x1b[35m" + password + "\x1b[0m");

  if (!user)
    return res.json({ msg: "Invalid Username", status: false });

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
  // const { username, email, password } = req.body;
  const { username, password, email } = req.body;

  console.log("\nCreate New User -> User: \x1b[33m" + username + "\x1b[0m || Password = \x1b[35m" + password + "\x1b[0m || " + email);

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