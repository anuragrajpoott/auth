const bcrypt = require("bcrypt");
const User = require("../models/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "password error"
            })

        }
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        res.json({
            success: true,
            message: "user registered successfully"
        })
    } catch (err) {
        res.status(500).json({
            error: console.error(err),
            message:"user cant be registered"
        })

    }

}


exports.login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status().json({
                success: false,
                message:"fill all the details"
            })
        const user = await User.findOne({email});
        if(!user){
            res.status(0).json({
                success:false,
                message:"user not registered"
            })

        const payload = {
            email:user.email,
            id:User._id,
            role : user.role
        }    
        if(await bcrypt.compare(password,User.password)){
            let token = jwt.sign(payload,process.env.jmt_code,{
                expiresIn:"2h"
            })

            user.token= token;
            user.password=undefined;

            const options = {
                expiresIn : new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }

            User.cookie("token",token,options).status(200).json({
                success:true,
                token,user,
                message:"logged in succesfully"
            })

        }
        else{
            res.status(0).json({
                status:false,
                message:"wrong password"
            })
        }
        }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error
        })
        
    }

}

