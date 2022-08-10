let {projectVars} = require("./GlobalVariables");
const {load} = require("./util/DataManager");
const {processString} = require("./core/Chat");
const app = require('fastify')()

/*
Yo, i know my code is horrible and doesn't work well but i tried some things :)
 */

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

/*
Ajouter un truc qui requiert un certain caractère aux questions
ça va ?
comment ça va

faire un système de synonyme
 */

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

projectVars.chatbotData = load()

function ask() {
    rl.question('Message : ', async (answer) => {
        console.log(await processString(answer.toLowerCase()));
        ask()
    });
}

module.exports.processString = processString

require('./web/Server')(app)
ask()