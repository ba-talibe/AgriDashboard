const express = require("express");
const { 
    loginView, 
    registerView, 
    registerUser, 
    loginUser,
    checkLogging,
    checkNotLogging,
    logout } = require("../controllers/loginController");
const  dashboardView = require("../controllers/dashbordController");
router =  express.Router();
router.get("/login",checkNotLogging,  loginView);
router.get("/dashboard", checkLogging,   dashboardView);
router.post("/logout", logout);
router.get("/register", registerView);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
