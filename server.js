const express = require("express")
const app = express()
const port = process.env.PORT || 666

const booksRouter = require("./routers/books.router")

app.use(express.json())

app.use("/books", booksRouter)

app.listen(port, () => {console.log(`Server be chillin on ${port}`)})