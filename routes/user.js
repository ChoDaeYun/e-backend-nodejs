var express = require('express');
const UserController = require("../controller/UserController");
var router = express.Router();

router.get("/",UserController.find);
router.put("/",UserController.update);
router.put("/withdraw",UserController.withdraw);

module.exports = router;
