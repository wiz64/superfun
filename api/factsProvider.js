// scan database for jokes and return them
var fs = require('fs');
var path = require('path');
// import node-fetch
// read database/api-ninjas/facts.json
var facts = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/api-ninjas/facts.json')));
// return random fact(s)
function getFacts(numberOfFacts = 1) {
    if(numberOfFacts > facts.length){
        numberOfFacts = facts.length;
    }
    var randomFacts = [];
    while(randomFacts.length < numberOfFacts){
        var randomFact = facts[Math.floor(Math.random() * facts.length)];
        if(!randomFacts.includes(randomFact)){
            randomFacts.push(randomFact);
        }
    }
    return randomFacts;
}
module.exports.getFacts = getFacts;
