// express hello world
var express = require('express');
var app = express();

var PORT = 3000;
var api =  require('./api/routes.js');

app.get('/*',api);

app.listen(PORT, function () {
    console.log(` ---- SUPERFUN API IS SERVING FUN  ---- `);
    console.log(`  - ON PORT ${PORT}  `);}
);

module.exports = app;
