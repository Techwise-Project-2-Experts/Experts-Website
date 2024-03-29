const express = require("express");
const app = express();
const path=require("path");
const { collection, userCollection } = require("./mongodb")

const PORT = 4000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const loggerMiddleware = (req, res, next) =>{
    console.log(req.method, req.url);
    next();
}

app.use(loggerMiddleware);

app.get("/", (req, res)=>{
    const indexPath = path.join(__dirname, "../public/index.html");
    res.sendFile(indexPath);
})

app.get("/console", (req, res)=>{
    const consolePath = path.join(__dirname, "../public/console_profile.html");
    res.sendFile(consolePath);
})

app.get("/files", (req, res)=>{
    const consolePath = path.join(__dirname, "../public/files.html");
    res.sendFile(consolePath);
})

app.get("/notes", (req, res)=>{
    const consolePath = path.join(__dirname, "../public/notes.html");
    res.sendFile(consolePath);
})

app.get("/profile", (req, res)=>{
    const consolePath = path.join(__dirname, "../public/profile.html");
    res.sendFile(consolePath);
})

app.get("/login", (req, res)=>{
    sessionStorage.clear();
    res.sendFile("login.html");
})

app.get("/signup", (req, res)=>{
    sessionStorage.clear();
    res.sendFile("signup.html");
})



app.post("/signup", async (req, res)=>{
    const data={
        email: req.body.email,
        password: req.body.password
    }
    console.log(data);
    const filter = { email: data.email };
    const update = {
        $setOnInsert: data
    }
    const result = await collection.updateOne(filter, update, { upsert: true} );

    if (result.matchedCount > 0){
        res.json({ status: 'error', message: 'Email already in use. Try another email.' });
    }else{
        let newUser = {
            email: data.email,
            username: "",
            posts: [],
            connections: [],
            profileInfo: null,
            files: []
         }
         const filter = { email: data.email };
        const update = {
        $setOnInsert: newUser
        }
         
        const insertResponse = await userCollection.updateOne(filter, update, {upsert: true})
        console.log("Redirecting...");
        res.redirect("/console");
    }
})

app.post("/profile", async (req, res) =>{
    const user = req.body
    console.log(user)
    const filter = { email: user.email };
    console.log(user.email);
    const update = {
        $set: user
    }

    const result = await userCollection.updateOne(filter, update );

    if (result.matchedCount == 0){
        console.log('Terrible Error. User profile not found' );
    }else {
        console.log("Update Successful")
    }
})

app.post("/login", async (req, res)=>{
    const data={
        email: req.body.email,
        password: req.body.password
    }
    console.log(data);

    const user = await collection.findOne(data);

    if (user){
        const userData = await userCollection.findOne({email: data.email})
        if(userData){
            console.log("server.js - Your response is:")
            console.log(userData);
            res.json(userData)
        } else {
            console.log("This user has no data.")
        }
    }else{
        res.json({ status: 'error', message: 'Email or Password not correct. Please try again.' });
    }
})

app.listen(PORT, () =>{
    console.log("server running on port " + PORT);
})