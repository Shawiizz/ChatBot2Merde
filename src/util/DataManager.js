const fs = require("fs");
const { appDir} = require("../GlobalVariables");

function load () {
    return JSON.parse(fs.readFileSync(appDir+'/data/data.json').toString('utf-8'))
}

function save(data) {
    fs.writeFileSync(appDir+'/data/data.json', JSON.stringify(data, null, 4))
}

module.exports.load = load
module.exports.save = save