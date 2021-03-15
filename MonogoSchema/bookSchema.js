const mongoose = require("mongoose")



const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    authorId: {
        type: String,
        required: false
    }

})

const Book = mongoose.model("book", BookSchema);

module.exports = Book;