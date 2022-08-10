const {removePonctuation} = require("./FunctionUtil");
const {save} = require("./DataManager");
let { projectVars} = require("../GlobalVariables");

function addPhrase(phrase) {
    //TODO: Check if similar doesn't exist

    projectVars.chatbotData.push({
        phrases: [removePonctuation(phrase)],
        answers: []
    })
    save(projectVars.chatbotData)
}

function addAnswer(answer) {
    projectVars.chatbotData[projectVars.chatbotData.length - 1].answers.push(answer)
    save(projectVars.chatbotData)
}

module.exports.addPhrase = addPhrase
module.exports.addAnswer = addAnswer