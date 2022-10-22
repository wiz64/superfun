// express hello world
var express = require('express');
var app = express();
var jokesProvider = require('./jokesProvider.js');
var PORT = 3000;

app.get('/', function (req, res) {
    // send json response to browser with message, status and api info including github page

    res.setHeader('Content-Type', 'application/json');
    res.send(`{"message": "Welcome ! SuperFun api serves you fun things like Jokes, Memes, Trivia, Facts and More. Please check Documentation",
    "status": "Online", "author":"wiz64",
    "github": "https://github.com/wiz64/superfun",
    "forJokes":"/jokes/:number"} `);
   
}
);
// match /jokes amd /jokes/number
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
app.get('/jokes', serveJokes);
app.get('/jokes/:number', serveJokes);

app.listen(PORT, function () {
    console.log(` ---- SUPERFUN API IS SERVING FUN  ---- `);
    console.log(`  - ON PORT ${PORT}  `);}
);
