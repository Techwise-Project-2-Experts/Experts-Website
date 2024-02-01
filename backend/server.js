const express = require("express");
const app = express();
const path=require("path");
const collection = require("./mongodb")

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

app.get("/profile", (req, res)=>{
    const consolePath = path.join(__dirname, "../public/profile.html");
    res.sendFile(consolePath);
})

app.get("/login", (req, res)=>{
    res.sendFile("login.html");
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
    console.log("Redirecting...");
    res.redirect("/console");
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
        console.log("Redirecting...");
        res.redirect("/console");
    }else{
        res.json({ status: 'error', message: 'Email or Password not correct. Please try again.' });
    }
})

app.listen(PORT, () =>{
    console.log("server running on port " + PORT);
})