const { dirname } = require('path');

const appDir = dirname(require.main.filename).replace('src', '');
const port = 25647

const projectVars = {
    requestingInput: false,
    currentHandler: undefined,
    currentHandlerName: "",
    chatbotData: []
}

module.exports.appDir = appDir
module.exports.projectVars = projectVars
module.exports.port = port