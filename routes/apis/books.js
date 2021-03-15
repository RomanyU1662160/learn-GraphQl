const express = require("express");
const Book = require("../../MonogoSchema/bookSchema");

const router = express.Router();


router.get("/books", async (req, res) => {
    try {
        let books = await Book.find()
        res.send(books);
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/books", async (req, res) => {
    try {
        const { title, year, genre, authorId } = req.body;
        const newBook = new Book({ title, year, genre, authorId });

        await newBook.save();
        res.send(newBook);
    } catch (error) {
        res.send(error.message)
    }



})


module.exports = router;