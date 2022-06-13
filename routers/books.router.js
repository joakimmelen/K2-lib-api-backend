const express = require("express")
const booksRouter = express.Router()
const booksController = require("../controllers/books.controller")

booksRouter.get("/", booksController.getAll)
booksRouter.post("/", booksController.add)
booksRouter.delete("/:id", booksController.remove)
booksRouter.get("/:id", booksController.getOne)
booksRouter.put("/:id", booksController.update)
booksRouter.patch("/:id", booksController.edit)

module.exports = booksRouter