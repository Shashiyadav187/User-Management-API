// run functions with url
// localhost:8081/hello

var express = require('express');
var app = express();
var fileSystem = require('fs');
var path = require('path');
bodyParser = require('body-parser');

var name, email, password; //global
var obj;

app.get('/register.html', function(req, res) {
    var filePath = path.join(__dirname, 'register.html');
    var stat = fileSystem.statSync(filePath);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()

    readStream.pipe(res);
});

app.use(express.bodyParser());

app.post('/register', function(request, response) {
    console.log(request.body.user.name);
    console.log(request.body.user.email);
    console.log(request.body.user.password);
});

$("#show_all_users").click(
    $.getJSON("http://localhost:3000/showusers", (json) => {
        var tr = $('</tr>');
        tr.append("<td>" + json[i].name + "</td>");
        tr.append("<td>" + json[i].email + "</td>");
        tr.append("<td>" + json[i].password + "</td>");
        $('.all_users').append(tr);
    });
);