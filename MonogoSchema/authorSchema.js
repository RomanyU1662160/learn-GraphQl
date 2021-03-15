const mongoose = require("mongoose")



const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        required: false
    }


})

const Author = mongoose.model("author", authorSchema)

module.exports = Author

