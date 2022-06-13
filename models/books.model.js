const db = require("../config/db")

function findAll() {
    const sql = `SELECT * FROM books;`

    return new Promise((resolve, reject) => {
        db.all(sql, (error, rows) => {
            if (error) {
                console.error(error.message)
                reject(error)
            }
            resolve(rows)
        })
    })
}

function create(book) {
    const sql = `INSERT INTO books (title, author, genre, qty) VALUES (?, ?, ?, ?);`

    return new Promise((resolve, reject) => {
        db.run(sql, [book.title, book.author, book.genre, book.qty], (error) => {
            if (error) reject(error)
            resolve()
        })
    })
}

function remove(id) {
    const sql = `DELETE FROM books WHERE id = ?;`

    return  new Promise((resolve, reject) => {
        db.run(sql, id, (error) => {
            if (error) {
                console.error(error.message)
                reject(error)
            }
            resolve()
        })
    })
}

function findOne(id) {
    const sql = `SELECT * FROM books WHERE id = ?;`

    return new Promise((resolve, reject) => {
        db.get(sql, id, (error, row) => {
            if (error) reject(error)
            resolve(row)
        })
    })
}

function update(id, book) {
    const sql = `UPDATE books SET title = ?, author = ?, genre = ?, qty = ? WHERE id = ?;`

    return new Promise((resolve, reject) => {
        db.run(sql, [book.title, book.author, book.genre, book.qty, id], (error) => {
            if (error) reject(error)
            resolve()
        })
    })
}

module.exports = {
    findAll,
    create,
    remove,
    findOne,
    update
}