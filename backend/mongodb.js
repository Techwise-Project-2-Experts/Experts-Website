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

const fileSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
})

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true
  },
  headline: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  experience: [{
    type: String,
    required: false
  }],
  education: [{
    type: String,
    required: false
  }],
  skills: [{
    type: String,
    required: false
  }],
})


const userSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true
   },
   username:{
       type: String,
       required: true
   },
   posts: [{
       type: String,
       required: false
   }],
   connections: [{
       type: this,
       required: false
   }],
   profileInfo: {
    type: profileSchema,
    required: true
   },
   files: [{
    type: fileSchema,
    required: false
   }]
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
const userCollection = new mongoose.model("users", userSchema);

module.exports = { collection, userCollection };

/*
1. Add routes to every functional page
2. Send html Elements and write for profile page
3. Do what we did in #2 for main page
*/