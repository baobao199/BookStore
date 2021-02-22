const express = require("express");
const router = express.Router();

var controller = require("../controllers/category.controller");

router.get("/", controller.index);
router.get("/add", controller.addCategory);
router.post("/upload",controller.uploadCategory);
router.post("/edit",controller.editCategory);
router.post("/update",controller.updateCategory);
router.post("/delete",controller.deleteCategory);
router.post("/book",controller.findbyidCategory)

module.exports = router;