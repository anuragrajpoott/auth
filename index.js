const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser);

app.use(express.json());

require("dotenv").config();

app.get("/", (req, res) => {
    res.send(`<h1>home page</h1>`)
});

const route = require("./routes/route");
app.use("/api/v1", route);

app.listen(process.env.PORT, () => {
    console.log("server running");
})

const dbConnect = require("./config/dataBase");
dbConnect();

