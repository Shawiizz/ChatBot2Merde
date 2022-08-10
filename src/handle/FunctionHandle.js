const {addPhrase, addAnswer} = require("../util/Learning");
let {projectVars} = require("../GlobalVariables");
const functionMap = new Map()
module.exports.functionMap = functionMap

functionMap.set('learnHandler', learnHandler)
functionMap.set('exitHandler', exitHandler)

function learnHandler(input) {
    if(projectVars.currentHandlerName === "learn") {
        addPhrase(input)

        projectVars.currentHandlerName = "learn_2"
        projectVars.requestingInput = true

        return "D'accord, quelle serait la réponse appropriée à votre phrase / question ?"
    } else {
        addAnswer(input)
        projectVars.requestingInput = false
        return "D'accord, j'espère que vous ne m'avez pas dit de la merde."
    }
}

function exitHandler(input) {
    process.exit()
}