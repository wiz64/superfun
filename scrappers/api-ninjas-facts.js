const axios = require('axios');
// parse .env file
const md5 = require('md5');
require('dotenv').config();
// To avoid server blocking, we use a random user agent string

UAarray = ['Mozilla Firefox','Google Chrome','Internet explorer']
// UAcode = random number between 1 and 2000
UAcode = Math.floor(Math.random() * 2000) + 1;
UAstring = UAarray[Math.floor(Math.random() * UAarray.length)]+"-"+UAcode;

async function getFacts(number) {
    try {
        if (!number) {number = 1;}
        const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=' + number, {
            headers: {
                Accept: 'application/json',
                'User-Agent': UAstring,
                'X-Api-Key': process.env.API_NINJAS_API_KEY
            }
        });
        response_data = response.data;
        if(response.status == 200){
        // generate md5 for each fact string
        for (i = 0; i < response_data.length; i++) {
            response_data[i].id = 'anfact-'+md5(response_data[i].fact);
        }
        console.log(response_data);
        return response_data;}
        else {console.log("Error: "+response.status+" "+response.message); return 0;}
    } catch (error) {
        console.log(error);
        return 0;
    }
}

module.exports.getFacts = getFacts;