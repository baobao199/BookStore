const express = require("express");
const router = express.Router();

var controller = require("../controllers/book.controller");

router.get("/", controller.index);
router.get("/add",controller.addBook)
router.post("/upload",controller.uploadBook)
router.post("/edit",controller.editBook)
router.post("/update",controller.updateBook)
router.post("/delete",controller.deleteBook)


module.exports = router;