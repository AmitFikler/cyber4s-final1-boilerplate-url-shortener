const express = require('express')
const router = express.Router()
const shortid = require('shortid');
const fs = require('fs')
const validUrl = require("valid-url");
const Database = require("../database/dbClass");





router.post("/api/shorturl/new", (req,res)=>{
        const urlCode = shortid.generate()
        const urlData = new Database(req.body.longURL, urlCode, `http://localhost:3000/${urlCode}`)
        const save = urlData.saveToDB()
        if(save) res.send(save)
        res.send(`http://localhost:3000/${urlCode}`)
})

router.get("/:code", (req,res)=>{
        let code = req.params.code
        let dbArray = JSON.parse(fs.readFileSync("./database/DB.json","utf8"))
        if (code in dbArray){
                dbArray[code]["count"] += 1
                fs.writeFileSync("./database/DB.json", JSON.stringify(dbArray))
                return res.redirect(301,dbArray[code]["longUrl"])
        }
        res.send("no such url")
})

router.get("/api/statistic/:code", (req,res)=>{
        let code = req.params.code
        let dbArray = JSON.parse(fs.readFileSync("./database/DB.json","utf8"))
        if (code in dbArray){
                res.send({
                        creationDate:dbArray[code]["date"],
                        redirectCount:dbArray[code]["count"],
                        originalUrl:dbArray[code]["longUrl"],
                        "shorturl-id":code
                })
        }
        res.send("no such url")
})


module.exports = router



