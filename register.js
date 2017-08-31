// run functions with url
// localhost:8081/hello

var express = require('express');
var app = express();
var fileSystem = require('fs');
var path = require('path');
bodyParser = require('body-parser');

var name, email, prof_pic, bio, grade; //global
var obj;

app.get('/test.html', function(req, res) {
    var filePath = path.join(__dirname, 'test.html');
    var stat = fileSystem.statSync(filePath);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()

    readStream.pipe(res);
});

app.use(express.bodyParser());

app.post('/', function(request, response) {
    console.log(request.body);
});
