// express hello world
var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req, res) {
    // send json response to browser with message, status and api info including github page

    res.setHeader('Content-Type', 'application/json');
    res.send(`{"message": "Welcome ! SuperFun api serves you fun things like Jokes, Memes, Trivia, Facts and More. Please check Documentation", "status": "Online", "author":"wiz64", "github": "https://github.com/wiz64/superfun"}`);
   
}
);

app.listen(PORT, function () {
    console.log(` ---- SUPERFUN API IS SERVING FUN  ---- `);
    console.log(`  - ON PORT ${PORT}  `);}
);
