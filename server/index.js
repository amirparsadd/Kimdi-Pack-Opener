//Main

const utility = require("./utility")
const cm = require("./cardmanager")
const express = require("express")
const fm = require("./filemanager")
const cors = require("cors")
require('dotenv').config()
const app = express()

const PORT = 8080
const NAME = "Kimdi Club"

app.use(cors())
app.get('/', (req, res) => {
    if(req.query["req"] == null || req.query["data"] == null){
        res.end(`${NAME} Is Up`)
        return;
    }

    var request = req.query["req"]
    var data = req.query["data"]

    if(request == "OPEN"){
        drop = cm.openPack(data)
        if(drop != null){
            res.end(JSON.stringify(drop))
            utility.log("pack-opener", "There Was A Drop Of " + drop.name + " With Code " + data)
            return
        }else{
            res.end("null")
            return
        }
    }

    if(request == "PLAYERS"){
        res.end(JSON.stringify(cm.getCards()))
        return
    }

    if(request == "PULL"){
        if(data == process.env.PASSWORD){
            cm.pullData()
            res.end("DONE")
            return
        }
        res.end("PASSWORD INCORRECT")
        return
    }

    if(request == "CHECK"){
        if(cm.getCodes().map[data] == null || cm.getCodes().map[data] == undefined){
            res.end("null")
            return
        }
        res.end(JSON.stringify(cm.getCodes().map[data]))
        return
    }

    res.end("UNKNOWN")
})
  
app.listen(PORT, () => {
    utility.log("s-host", "Server Is Running At Port " + PORT)
})