const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");


const registerView = (req, res) => {
    res.render("register", { 
        msg : ""
    });
}

const loginView = (req, res) => {
    res.render("login", { email : ""
    });
}

const registerUser = (req, res) =>{
    //recupration des donnee poster
    const {name, email, password, confirm } = req.body; 
    // verification des donnee vides
    if( !name || !email || !password || !confirm){
        console.log("Fill the empty field");
        return res.render("register" , { 
            msg : " champs vide detecter"
        });
    }

    if (password !== confirm){//verifation des mot de passes
        console.log("Password must match");
        return res.render("register" , { 
            msg : "champs vide detecter"
        });
    }else{
        User.getUser(email)
            .then((user) => {
            if (user) {
                console.log("Account already exists");
                res.render("register", {
                    name, 
                    email,
                    password,
                    confirm,
                    msg : " Account already exists "
                })
            }else{
                //Validation des champs
                //hachage du mot de passe
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) 
                        throw err;
                    bcrypt.hash(password, salt, (err, hashedPassword) => {
                        User.addUser(name, email, password)
                            .then(res.redirect("/login"))
                            .catch(console.log(err))
                    })
                })


            }
        })
    }
}

const loginUser = (req, res) => {
    const { email,  password } = req.body; 
    if(  !email || !password ){
        console.log("Fill the empty field");
        return res.redirect("/login");
    }else{
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
          })(req, res);
    }
}

const checkLogging  = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    res.redirect("/login")
}

const checkNotLogging  = (req, res, next) => {
    if(!req.isAuthenticated())
        return next();
    res.redirect("/dashboard")
}

const logout = (req, res) => {
   req.logOut();
   res.redirect("/login");
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    checkLogging,
    checkNotLogging,
    logout
};