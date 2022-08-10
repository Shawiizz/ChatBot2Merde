const {port} = require("../GlobalVariables");
const fs = require("fs");
const {processString} = require("../main");

module.exports = (app) => {
    console.log("Initializing server")
    app.listen(port, '::', (err) => {
        if (err) {
            console.log('Failed to initialize server.')
            console.log(err)
            process.exit(1)
        }

        console.log(`Server initialized on port ${port}!`)
    })

    app.get('/', (req, res) => {
        res.type('text/html').send(fs.readFileSync('./web/index.html'))
    })

    app.post('/chat', async (req, res) => {
        return await processString(req.body.toLowerCase())
    })
}