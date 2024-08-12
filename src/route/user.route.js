const {
  userLogin,
  userRegister,
  userList,
  refreshToken,
} = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/at.middleware");
const { authenticateRefreshToken } = require("../middleware/rt.middleware");

const router = require("express").Router();

router.route("/login").post(userLogin);
router.route("/register").post(authenticateToken, userRegister);
router.route("/list").get(authenticateToken, userList);
router.route("/refresh").post(authenticateRefreshToken, refreshToken);

module.exports = router;
