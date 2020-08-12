var express = require('express');
const CategoryController = require("../controller/CategoryController");
var router = express.Router();

router.get("/",CategoryController.find);
router.get("/:category_id",CategoryController.find);
router.post("/",CategoryController.create);
router.put("/:category_id",CategoryController.update);
module.exports = router;
