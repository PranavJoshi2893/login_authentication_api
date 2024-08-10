const { userLogin, userRegister } = require("../controller/user.controller");

const router = require("express").Router();

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);

module.exports = router;
