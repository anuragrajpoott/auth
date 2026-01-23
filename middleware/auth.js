const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try {
        const token = req.body.token || req.cookie.token || req.header("authorization").replace("Bearer ","");
        if(!token){
            res.status(401).json({
                success:false,
                message:"token not found"
            })
        }
     
        try {
            const decode = jwt.verify(token,process.env.jwt_code);
            req.user = decode;
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"token invalid"
            })
            
        }
        next();
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"verification failed"
        })
        
        
    }
}




exports.isStudent = (req,res,next) => {
    try {
        if(req.user.role!=="student"){
            res.status().json({
                success:false,
                message:"your role is incorrect"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status().json({
            success:false,
            message:"something went wrong"
        })
    }
}




exports.isAdmin = (req,res,next) => {
    try {
        if(req.user.role!=="Admin"){
            res.status().json({
                success:false,
                message:"your role is incorrect"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status().json({
            success:false,
            message:"something went wrong"
        })
    }
}