const express = require("express");
const router = express.Router();

var controller = require("../Controllers/account.controller");

router.get("/", controller.index);
router.get("/logout",controller.logoutAccount)
router.post("/process",controller.loginAccount)


module.exports = router;