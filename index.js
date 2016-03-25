
var express = require('express');
var serveStatic = require("serve-static");

var app = express(); 
app.use(serveStatic(__dirname + "/.")); 

//Server listening port.
app.listen(3000);
console.log('Server running on http://0.0.0.0:3000/');