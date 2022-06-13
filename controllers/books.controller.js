const model = require("../models/books.model")

async function getAll(req, res) {
    try {
        const books = await model.findAll()

        res.status(200).json({ status: "success", data: books })
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message })
    }
}

async function add(req, res) {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            qty: req.body.qty
            
        }
        if (!book.title) {
            res.status(400).json({ status: "error", message: "Missing title" })
            return
        }
        if (!book.author) {
            res.status(400).json({ status: "error", message: "Missing author" })
            return
        }
        if (!book.genre) {
            res.status(400).json({ status: "error", message: "Missing genre" })
            return
        }
        if (!book.qty) {
            res.status(400).json({ status: "error", message: "Missing quantity(qty)" })
            return
        }

        await model.create(book)

        res.status(200).json({ status: "success", data: book })
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message })
    }
}

async function remove(req, res) {
    const id = req.params.id

    try {
        const removedBook = await model.findOne(id)
        if (!removedBook) throw new Error(`No book with id(${id}) was found`)

        await model.remove(id)

        res.status(200).json({ status: "success", data: removedBook })
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message })
    }
}

async function getOne(req, res) {
    const id = req.params.id

    try {
        const book = await model.findOne(id)
        if (!book) throw new Error(`No book with id(${id}) was found`)
        res.status(200).json({ status: "success", data: book })
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message })
    }
}

async function update(req, res) {
    const id = req.params.id
   
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            qty: req.body.qty
        }
        if (!book.title) {
            res.status(400).json({ status: "error", message: "Missing title" })
            return
        }
        if (!book.author) {
            res.status(400).json({ status: "error", message: "Missing author" })
            return
        }
        if (!book.genre) {
            res.status(400).json({ status: "error", message: "Missing genre" })
            return
        }
        if (!book.qty) {
            res.status(400).json({ status: "error", message: "Missing quantity(qty)" })
            return
        }

        await model.update(id, book)

        const updatedBook = await model.findOne(id)
        if (!updatedBook) throw new Error(`No book with id(${id}) was found`)

        res.status(200).json({ status: "success", data: updatedBook })
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message })
    }
}
async function edit(req, res) {
    const id = req.params.id
    const oldBook = await model.findOne(id)

    try {
        const book = {
            title: req.body.title || oldBook.title,
            author: req.body.author || oldBook.author,
            genre: req.body.genre || oldBook.genre,
            qty: req.body.qty || oldBook.qty
        }

        await model.update(id, book)

        const updatedBook = await model.findOne(id)
        if (!updatedBook) throw new Error(`No book with id(${id}) was found`)

        res.status(200).json({ status: "success", data: updatedBook })
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message })
    }
}

module.exports = {
    getAll,
    add,
    remove,
    getOne,
    update,
    edit
}