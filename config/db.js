const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.sqlite", (error) => {
    if (error) {
        console.error(error.message)
        throw error
    }
    
    console.log("Connection established to da base")

    const statements = {
        books: `
        CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        genre TEXT,
        qty INTEGER
        )`
    }

    db.run(statements.books, (error) => {
        if (error) console.error(error.message)
    })
})

module.exports = db