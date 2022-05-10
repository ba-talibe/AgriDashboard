const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    location : {
        type : String,
        default : "Pikine"
    },
    date : {
        type : String,
        default : Date.now
    }
});

const User = mongoose.model("User", UserScheme);

module.exports = User;