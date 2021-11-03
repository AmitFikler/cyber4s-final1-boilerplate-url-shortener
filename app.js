require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrl = require("./routers/shortURL")
const app = express();

app.use(cors());

app.use("/public", express.static(`./public`));



app.use("/api/shorturl", shortUrl)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
