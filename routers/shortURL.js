const express = require('express')
const router = express.Router()
const shortid = require('shortid');
const fs = require('fs')
const validUrl = require("valid-url");





const urlsObj= {}
router.post("/api/shorturl/new", (req,res)=>{
        const urlCode = shortid.generate()
        urlsObj[urlCode] = req.body.longURL
        let db = JSON.parse(fs.readFileSync('./DB.json',"utf8"))
        db.push(urlsObj)
        fs.writeFileSync('./DB.json',JSON.stringify(db))
        res.send(`http://localhost:3000/${urlCode}`)
})

router.get("/:code", (req,res)=>{
        let code = req.params.code
        let dbArray = JSON.parse(fs.readFileSync("./DB.json","utf8"))
        for (let obj of dbArray){
                if(code in obj){
                        return res.redirect(301,obj[code])
                }
        }
        res.send("no such url")
})


module.exports = router



