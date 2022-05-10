const { request } = require("express");
const passport = require("passport");
const User = require("./models/User")
const bcrypt = require("bcryptjs");
const LocaStrategy = require("passport-local").Strategy;

function initialise(passpaort){

    const verifierUtlisateur = async (email, password, done) =>{
        User.findOne({email : email})
            .then((user) => {
                if(!user){
                    console.log("User doesn't existe");
                    return done(null, false);
                }

                bcrypt.compare(password,  user.password, (err, match) => {
                    if (err)
                        throw err;
                    if(match){
                        return done(null, user);
                    }else{
                        console.log("wrong password");
                        return done(null, false, { message : "wrong password" });
                    }
                });
                
            });

    }
    passport.use(new LocaStrategy({ usernameField: "email"}, verifierUtlisateur))

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
          done(error, user);
        });
      });
}
 
module.exports = initialise;