const {removePonctuation, randomIntFromInterval, capitalizeFirstLetterIfTrue} = require("../util/FunctionUtil");
const {projectVars} = require("../GlobalVariables");
const {getPhrasesSynonyms} = require("./Synonym");
const {findBestMatch} = require("../util/StringUtil");
const {functionMap} = require("../handle/FunctionHandle");

module.exports.processString = async (input) => {
    const answerWithoutPonctuation = removePonctuation(input) //String without ponctuation
    const extractedWords = answerWithoutPonctuation.split(" ") //Array of string of all words without ponctuation
    const ponctuationFixed = input.replace(/\s+([.,-\/#!$?%^&*;:{}=\-_`~()])/g, "$1").replace(/([.,-\/#!$?%^&*;:{}=\-_`~()])\s+/g, "$1"); //Remove whitespaces before and after ponctuation to avoid errors

    /*
    Handling input
     */
    if (projectVars.requestingInput) {
        projectVars.requestingInput = false
        return projectVars.currentHandler(input)
    }

    let matchingData = []
    let highMatchingButNotEnough = []

    for(const data of projectVars.chatbotData) {
        let moyPercentage = 0
        for(const originalPhrase of data.phrases) {
            for(let phrase of getPhrasesSynonyms(originalPhrase)) {
                phrase = removePonctuation(phrase) //Minimize the risk of bad percentage while it's matching

                const words = phrase.split(' ')

                let generated = []

                let index = 0
                for (const word of extractedWords) {
                    let genS = []
                    for (let i = index; i < index + words.length; i++)
                        genS.push(extractedWords[i])
                    genS = genS.filter(v => v !== undefined && v.length > 0)
                    generated.push(genS.join(" "))
                    index++
                }

                generated = generated.filter(v => v !== undefined && v.length > 0) //remove empty strings

                const matching = findBestMatch(phrase, generated)
                moyPercentage = (moyPercentage + matching.bestMatch.rating)/2 //For now not used but could filter more
                //console.log(matching.bestMatch.rating);
                if (matching.bestMatch.rating >= 0.8)
                    matchingData.push(data)
                if(matching.bestMatch.rating >= 0.7)
                    highMatchingButNotEnough.push(data)
            }
        }
    }

    matchingData = [...new Set(matchingData)] //Remove duplicates answers

    //REMOVE THIS PART IF IT SAYS TOO MUCH
    highMatchingButNotEnough = [...new Set(highMatchingButNotEnough)] //Remove duplicates answers
    if(matchingData.length === 0) matchingData = highMatchingButNotEnough

    /*
    Handling requesting input
     */
    for(const data of matchingData) {
        if(data?.handler) {
            projectVars.currentHandler = functionMap.get(data.handler)
            projectVars.currentHandlerName = data.name
            projectVars.requestingInput = true
            if(data?.executeNow)
                functionMap.get(data.handler)()
        }
    }

    /*
    Handling the answer of the bot
     */
    const selectedAnswers = matchingData.map(data => data.answers.random())

    const sortedAnswers = []
    const answersLeft = [...selectedAnswers] //Answers that have to be treated

    while(answersLeft.length !== 0) {
        const generatedNumber = randomIntFromInterval(2, 4) //Generate random number of replies in each answers

        const count = generatedNumber > answersLeft.length ? answersLeft.length : generatedNumber

        for (let i = 0; i < count; i++) {
            const end = i === count-1 ? '.' : i === count-2 && count >= 3 ? ' et' : ','
            const maj = sortedAnswers.length === 0 ? true : sortedAnswers[sortedAnswers.length - 1].endsWith('.')
            const lastChar = answersLeft[0].replaceAll(' ', '').split('').pop()

            if(['.', '?', '!'].includes(lastChar)) { //This ends a phrase
                sortedAnswers.push(capitalizeFirstLetterIfTrue(answersLeft[0], maj))
                answersLeft.shift()
                break
            }

            sortedAnswers.push(capitalizeFirstLetterIfTrue(answersLeft[0], maj)+end)
            answersLeft.shift()
        }
    }

    return sortedAnswers.length > 0 ? sortedAnswers.join(' ') : "Je n'ai pas compris."
}