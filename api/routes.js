const express = require('express')
const router = express.Router()
var jokesProvider = require('./jokesProvider.js');
var factsProvider = require('./factsProvider.js');
// define the about route
router.get('/', (req, res) => {
res.setHeader('Content-Type', 'application/json');
res.send(`{"message": "Welcome ! SuperFun api serves you fun things like Jokes, Memes, Trivia, Facts and More. Please check Documentation",
"status": "Online", "author":"wiz64",
"github": "https://github.com/wiz64/superfun",
"forJokes":"/jokes/:number",
"forPunchJokes":"/punchjokes/:number"} `);
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
function serveFacts(req,res) {
    // get number from url
    var number = req.params.number;
    if(!number || number < 0){
        number = 1;
    }
    var facts = factsProvider.getFacts(number);
    // send json response to browser with facts
    res.setHeader('Content-Type', 'application/json');
    res.send(facts);
    console.log(`Request from ${req.ip} for ${number} facts at ${new Date()}`);
}
function servePunchJokes(req,res) {
     // get number from url
     var number = req.params.number;
     if(!number || number < 0){
         number = 1;
     }
     var jokes = jokesProvider.getRandomPunch(number);
     // send json response to browser with jokes
     res.setHeader('Content-Type', 'application/json');
     res.send(jokes);
     //console.log(jokes);
     // log request ip, number ok jokes, time
     console.log(`Request from ${req.ip} for ${number} Punch jokes at ${new Date()}`);
    
}
router.get('/jokes', serveJokes);
router.get('/jokes/:number', serveJokes);
router.get('/punchjokes', servePunchJokes);
router.get('/punchjokes/:number', servePunchJokes);
router.get('/facts', serveFacts);
router.get('/facts/:number', serveFacts);


module.exports = router