const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username: "Azhar Ansari",
        content: "Will AI take our jobs? Maybe some. But the better question is—how will we adapt? Creativity, empathy, and critical thinking remain irreplaceable. Technology will always evolve. Our job is to evolve with it, not fear it. The future belongs to those who learn faster than the pace of change.",
    },
     {
        id:uuidv4(),
        username: "Arjun Malhotra",
        content: "Living in a different country completely changed how I see life. You realize your “normal” isn’t universal. Every culture has its own rhythm, values, and priorities. It’s humbling and refreshing. Travel isn't just about sights—it’s about seeing the world through new lenses and understanding what truly matters.",
    },
     {
        id:uuidv4(),
        username: "Rohit",
        content: "Why do late-night conversations feel more meaningful? Maybe it’s the quiet, the honesty, or just the lack of distractions. Night uncovers thoughts we hide in daylight. It’s when vulnerability feels safer and words flow without filters. Maybe we don’t fear being judged—because everyone’s too tired to pretend anymore.",
    }
];



app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})

const port = 8080;

app.listen(port, ()=>{
    console.log(`app is listing on ${port}`);
});