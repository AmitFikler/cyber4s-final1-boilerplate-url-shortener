const express = require('express')
const router = express.Router()
const shortid = require('shortid');
const fs = require('fs')
const validUrl = require("valid-url");
const { json } = require('body-parser');





router.post("/api/shorturl/new", (req,res)=>{
        const urlCode = shortid.generate()
        const longurl =  req.body.longURL
        let db = JSON.parse(fs.readFileSync('./DB.json',"utf8"))
        db[urlCode] = longurl
        fs.writeFileSync('./DB.json',JSON.stringify(db))
        res.send(`http://localhost:3000/${urlCode}`)
})

router.get("/:code", (req,res)=>{
        let code = req.params.code
        let db = JSON.parse(fs.readFileSync("./DB.json","utf8"))
        if (code in db){
                return res.redirect(301,db[code])
        }
        res.send("no such url")
})


module.exports = router



