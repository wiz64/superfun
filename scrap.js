const ichd = require('./scrappers/ichd');
const fs = require('fs');

var number =  process.argv.slice(2)[0];
if(number == undefined){number = 1;}
console.log("Number of jokes to scrap: "+number);
for (i = 0; i < number; i++) {
async function start(){
    
    var joke = await ichd.getJoke();
// save joke to database/ichd/<current_year>/<current_month>.json file
// if joke is not null, save it to database
if(joke){
    // remove status property from joke object
    delete joke.status;
    // save joke to database
    // get current month
    var date = new Date();
    // month in words
    var month = date.toLocaleString('default', { month: 'long' });
    var year = date.getFullYear();
    // get current year
    // get current month
    // check if file exists
    var filename = "./database/ichd/"+year+"/"+month+".json";
    // if ichd, year or month folder does not exist create it
    if (!fs.existsSync("./database/ichd/")){
        fs.mkdirSync("./database/ichd/");
    }
    if (!fs.existsSync("./database/ichd/"+year)){
        fs.mkdirSync("./database/ichd/"+year);
    }

    // if file does not exist create it
    if(!fs.existsSync(filename)){
        // create file
        fs.writeFileSync(filename, '[]');
    }
    if (fs.existsSync(filename)) {
        //file exists
        // read file
        var file = fs.readFileSync(filename);
        // parse file
        var json = JSON.parse(file);
        // add joke to json
        // if joke id already exists in json, do not add it
        var exists = false;
        for (j = 0; j < json.length; j++) {
            if(json[j].id == joke.id){
                exists = true;
            }
        }
        if(!exists){

        json.push(joke);
        // stringify json
        var stringified = JSON.stringify(json,null,1);
        // write to file
        fs.writeFileSync(filename, stringified);
    } }
  } }
  start();
}
