const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


let url = process.env.DB_URL




const connectDb = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('HELLO ROMANY, your Mongooose DB is  Connected ');


    } catch (error) {
        console.log('DB ERROR ', error.message);
        process.exit(1)
    }
}

module.exports = connectDb