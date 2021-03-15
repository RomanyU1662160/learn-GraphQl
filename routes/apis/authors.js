const express = require("express");
const Author = require("../../MonogoSchema/authorSchema");

const router = express.Router();


router.get("/authors", async (req, res) => {
    try {
        let authors = await Author.find()
        res.send(authors);
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/authors", async (req, res) => {
    try {
        const { name, email, books } = req.body;
        const newAuthor = new Author({ name, email, books });

        await newAuthor.save();
        res.send(newAuthor);
    } catch (error) {
        res.send(error.message)
    }



})


module.exports = router;