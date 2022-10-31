const express = require('express')
const router = express.Router()
var jokesProvider = require('./jokesProvider.js');
// define the about route
router.get('/', (req, res) => {
res.setHeader('Content-Type', 'application/json');
res.send(`{"message": "Welcome ! SuperFun api serves you fun things like Jokes, Memes, Trivia, Facts and More. Please check Documentation",
"status": "Online", "author":"wiz64",
"github": "https://github.com/wiz64/superfun",
"forJokes":"/jokes/:number"} `);
})
function serveJokes(req, res) {
    // get number from url
    var number = req.params.number;
    if(!number || number < 0){
        number = 1;
    }
    var jokes = jokesProvider.getRandom(number);
    // send json response to browser with jokes
    res.setHeader('Content-Type', 'application/json');
    res.send(jokes);
    //console.log(jokes);
    // log request ip, number ok jokes, time
    console.log(`Request from ${req.ip} for ${number} jokes at ${new Date()}`);
};
router.get('/jokes', serveJokes);
router.get('/jokes/:number', serveJokes);
module.exports = router