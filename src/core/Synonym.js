const synonyms = [
    ['je peux', 'puis-je', 'puis je', "j'peux"],
    ["quelque chose", 'qqch', 'truc'],
    ['préférée', 'pref'],
    ['graille', 'manger', 'bouffer']
]

/*
for now this function do not combine multiple synonyms in the same phrase, but could be implemented in the future
 */
function getPhrasesSynonyms(phrase) {
    let phrases = []

    for(const synonym of synonyms)
        for(const syn of synonym)
            if(phrase.includes(syn))
                for(const syn_ of synonym)
                    phrases.push(phrase.replace(syn, syn_))

    return phrases.length === 0 ? [phrase] : phrases
}

module.exports.getPhrasesSynonyms = getPhrasesSynonyms