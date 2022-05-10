const express = require("express");
const passport = require("passport");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const flash = require("flash")
const initialisePassport = require("./passport-config");
const session = require("express-session");


initialisePassport(passport);
const app = express();
dotenv.config();
// Mongo DB conncetion
const uri ="mongodb://127.0.0.1:27017/agribase?compressors=zlib";
const database = process.env.MONGOLAB_URI;
console.log(database);
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connecter a la base de donnee'))
    .catch(err => console.log(err));


const port = 8080;

app.use(express.urlencoded({extended: false}));

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: false
}))
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', require("./routes/login"));



app.listen(port, () => {
    console.log("Serveur is running");
})