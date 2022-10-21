// API Scrapper to scrap jokes from https://icanhazdadjoke.com/ API
// make api calls to https://icanhazdadjoke.com/ , accept "Application/json" and return json response
//
const axios = require('axios');
// To avoid server blocking, we use a random user agent string

UAarray = ['Mozilla Firefox','Google Chrome','Internet explorer']
// UAcode = random number between 1 and 2000
UAcode = Math.floor(Math.random() * 2000) + 1;
UAstring = UAarray[Math.floor(Math.random() * UAarray.length)]+"-"+UAcode;

const getJoke = async () => {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json',
                'User-Agent': UAstring
            }
        });
        response_data = response.data;
        if(response_data.status == 200){
        response_data.id = "ichd-"+response_data.id;
        console.log(response_data);
        return response_data;}
        else {console.log("Error: "+response_data.status+" "+response_data.message); return 0;}
    } catch (error) {
        console.log(error);
        return 0;
    }
}

module.exports.getJoke = getJoke;