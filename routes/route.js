const express = require("express");
const Router = express.Router();

const {login,signup} = require("../controllers/controller");
const {auth,isStudent,isAdmin} = require("../middleware/auth")

Router.post("/login",login);
Router.post("/signup",signup)
Router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to portal"
    });
})
Router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to students portal"
    });
})
Router.get("/Admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Admin portal"
    });
})

module.exports = Router;