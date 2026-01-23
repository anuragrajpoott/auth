const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log("database connected")})
    .catch((error)=>{
        console.log("error");
        console.error(error);
        process.exit(1);
    });
}

module.exports = dbConnect;