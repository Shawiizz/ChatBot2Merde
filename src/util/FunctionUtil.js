const ponctuationRgx = /[.,-\/#!$'?%^&*;:{}=\-_`~()]/g;

function capitalizeFirstLetterIfTrue(string, maj) {
    return maj ? string.charAt(0).toUpperCase() + string.slice(1) : string;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function removePonctuation(str) {
    return str.toLowerCase().replace(ponctuationRgx, "");
}

module.exports.capitalizeFirstLetterIfTrue = capitalizeFirstLetterIfTrue
module.exports.randomIntFromInterval = randomIntFromInterval
module.exports.removePonctuation = removePonctuation