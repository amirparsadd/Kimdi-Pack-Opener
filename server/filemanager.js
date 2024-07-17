//File Manager

const fs = require("fs")

const loadJSON = (directory) => {
    return JSON.parse(fs.readFileSync(directory))
}

const saveJSON = (json, directory) => {
    var fJSON = JSON.stringify(json);
    fs.writeFileSync(directory, fJSON)
}

module.exports = {
    loadJSON,
    saveJSON
}