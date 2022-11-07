// scan database for jokes and return them
var fs = require('fs');
var path = require('path');
// import node-fetch
var fetch = require('node-fetch');

// var joke_paths = get full path to ../database/ichd
var joke_paths = [path.join(__dirname, '../database/ichd')];
var punchjoke_paths = [path.join(__dirname, '../database/davidkatz')];

// if jokes.json file does not exist inside punchjoke_paths, download it from https://github.com/15Dkatz/official_joke_api/raw/master/jokes/index.json

if(!fs.existsSync(path.join(__dirname, '../database/davidkatz'))){
    fs.mkdirSync(path.join(__dirname, '../database/davidkatz'));
}
if(!fs.existsSync(path.join(punchjoke_paths[0], 'jokes.json'))){
    // download file 
    fetch('https://github.com/15Dkatz/official_joke_api/raw/master/jokes/index.json')
    .then(res => {
        const dest = fs.createWriteStream(path.join(punchjoke_paths[0], 'jokes.json'));
        res.body.pipe(dest);
    });
}

function getRandom(numberOfJokes = 1) {
// scan all subdirectories recursively for .json files and prepare a list of all files ending with .json
var json_files = [];
for (var i = 0; i < joke_paths.length; i++) {
    var files = fs.readdirSync(joke_paths[i]);
    for (var j = 0; j < files.length; j++) {
        var file = path.join(joke_paths[i], files[j]);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            // if directory, scan it recursively
            joke_paths.push(file);
        } else if (file.endsWith('.json')) {
            // if file, add it to the list
            json_files.push(file);
        }
    }
}
//console.log(json_files);

var jokes = [];
// for all files in json_files, read them, parse them and if they don't exist in jokes, add them
for (var i = 0; i < json_files.length; i++) {
    var file = json_files[i];
    var data = fs.readFileSync(file);
    var json = JSON.parse(data);
    for (var j = 0; j < json.length; j++) {
        var joke = json[j];
        if (!jokes.includes(joke)) {
            jokes.push(joke);
        }
    }
}

//console.log(jokes.length)
if(numberOfJokes > jokes.length){
    numberOfJokes = jokes.length;
}


// get numberOfJokes random jokes from jokes array
var randomJokes = [];
while(randomJokes.length < numberOfJokes){
    var randomIndex = Math.floor(Math.random() * jokes.length);
    var randomJoke = jokes[randomIndex];
    // if randomJoke.id is equal to any of randomJokes.id, add it
    var exists = false;
    for (var i = 0; i < randomJokes.length; i++) {
        if(randomJokes[i].id == randomJoke.id){
            exists = true;
        }
    }
    if(!exists){
        randomJokes.push(randomJoke);
    }
    
}
return randomJokes;

}

function getRandomPunch(numberOfJokes = 1) {
    // scan all subdirectories recursively for .json files and prepare a list of all files ending with .json
    var json_files = [];
    for (var i = 0; i < punchjoke_paths.length; i++) {
        var files = fs.readdirSync(punchjoke_paths[i]);
        for (var j = 0; j < files.length; j++) {
            var file = path.join(punchjoke_paths[i], files[j]);
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                // if directory, scan it recursively
                punchjoke_paths.push(file);
            } else if (file.endsWith('.json')) {
                // if file, add it to the list
                json_files.push(file);
            }
        }
    }
    //console.log(json_files);
    
    var jokes = [];
    // for all files in json_files, read them, parse them and if they don't exist in jokes, add them
    for (var i = 0; i < json_files.length; i++) {
        var file = json_files[i];
        var data = fs.readFileSync(file);
        var json = JSON.parse(data);
        for (var j = 0; j < json.length; j++) {
            var joke = json[j];
            if (!jokes.includes(joke)) {
                jokes.push(joke);
            }
        }
    }
    
    //console.log(jokes.length)
    if(numberOfJokes > jokes.length){
        numberOfJokes = jokes.length;
    }
    
    
    // get numberOfJokes random jokes from jokes array
    var randomJokes = [];
    while(randomJokes.length < numberOfJokes){
        var randomIndex = Math.floor(Math.random() * jokes.length);
        var randomJoke = jokes[randomIndex];
        // if randomJoke.id is equal to any of randomJokes.id, add it
        var exists = false;
        for (var i = 0; i < randomJokes.length; i++) {
            if(randomJokes[i].id == randomJoke.id){
                exists = true;
            }
        }
        if(!exists){
            randomJokes.push(randomJoke);
        }
        
    }
    return randomJokes;
    
    }

module.exports.getRandom = getRandom;
module.exports.getRandomPunch = getRandomPunch;

    
