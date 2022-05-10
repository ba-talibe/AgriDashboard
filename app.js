const express = require("express");
const passport = require("passport");
const db = require("./db");
const dotenv = require("dotenv");
const flash = require("flash");
const initialisePassport = require("./passport-config");
const session = require("express-session");
initialisePassport(passport);
const app = express();
dotenv.config();

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