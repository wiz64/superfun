var jokesProvider = require('./jokesProvider.js');
// parse argv
var args = process.argv.slice(2);
var number = args[0];
if (number < 0) {
    number = 1;
}
var jokes = jokesProvider.getRandom(number);
console.log(jokes);
