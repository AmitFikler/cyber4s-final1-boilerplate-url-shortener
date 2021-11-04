const express = require('express')
const router = express.Router()
const shortid = require('shortid');
const fs = require('fs')
const validator = require('validator');
const Database = require("../database/dbClass");





router.post("/api/shorturl/new", (req,res,next)=>{
        const urlCode = shortid.generate()
        if(!validator.isURL(req.body.longURL)){
                next({status:400, message: {error: "Invalid URL"}})
        }
        const urlData = new Database(req.body.longURL, urlCode, `http://localhost:3000/${urlCode}`)
        const save = urlData.saveToDB()
        if(save) res.send(save)
        res.send(`http://localhost:3000/${urlCode}`)
})

router.get("/:code", (req,res,next)=>{
        let code = req.params.code
        let dbArray = JSON.parse(fs.readFileSync("./database/DB.json","utf8"))
        if (code in dbArray){
                dbArray[code]["count"] += 1
                fs.writeFileSync("./database/DB.json", JSON.stringify(dbArray))
                return res.redirect(301,dbArray[code]["longUrl"])
        }
        next({status:404, message: {error: "no such url"}})
})

router.get("/api/statistic/:code", (req,res,next)=>{
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
        next({status:404, message: {error: "no such url"}})
})


module.exports = router



