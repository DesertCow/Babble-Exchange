const {
  login,
  register,
  getAllUsers,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
// TODO: Configure to NOT return own user name
router.get("/allusers/:id", getAllUsers);
// router.get("/allusers", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;