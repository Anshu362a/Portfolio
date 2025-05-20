//npm init -y
// npm i ejs express mongoose ejs-mate
// npm install dotenv
// npm install connect-flash express-session

if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const path =  require("path")
const app = express();
const ejsMate = require("ejs-mate");
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require("./utils/ExpressError.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.use(session({
  secret: process.env.SECRET, // use a strong random string in production
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 *24 } // optional: session expires in 1h x 24
}));

app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


app.get("/",(req,res)=>{
    // res.send("Home root");
    res.render("pages/home.ejs");
});

app.get("/home",(req,res)=>{
    // res.send("Home page");
    res.render("pages/home.ejs");
});

app.get("/resume",(req,res) =>{
    res.render("pages/resume");
});

app.get("/project",(req,res) =>{
    res.render("pages/project");
});

app.get("/aboutMe",(req,res) =>{
    res.render("pages/aboutMe");
});

app.get("/certificates",(req,res) =>{
    res.render("pages/certificate");
});

app.get("/contactUs",(req,res) =>{
    res.render("pages/contactUs");
});

app.get("/skills", (req, res) => {
    res.render("pages/skills");
  });
  

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

//Error handling
app.use((err,req,res,next)=>{
    let{statusCode=500, message="Somthing went wrong"} =err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8085,()=>{
    console.log("server is listening on port 8085");
});