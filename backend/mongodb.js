const mongoose = require("mongoose");

require("dotenv").config();

console.log(process.env)
const url = process.env.URI;
console.log(url);

mongoose.connect(url)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const logInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("logins", logInSchema);

module.exports = collection