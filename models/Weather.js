const mongoose = require("mongoose");

const WeatherSchema = mongoose.Schema({
    temperature : {
        type : Number,
        required : true
    },
    humiditeSol : {
        type : Number,
        required : true
    },
    temperatureAir : {
        type : Number,
        required : true
    },
})