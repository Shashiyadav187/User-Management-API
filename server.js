// server.js
var http = require('http');
var url = require('url');
var fs = require('fs'); // used to read/write, create/delete, rename files
var objArr;
var name, email;

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    fs.readFile('users.json', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        objArr = data.toString();

        var q = url.parse(req.url, true).query;
        name = q.name;
        email = q.email;

        //adds the json to the end of the users array
        var out = '\n\t{\n\t\t"name": "' + name + '",\n\t\t"email": "' + email + '"\n\t}'
        if (objArr[objArr.indexOf(']') - 1] == '[') {
            var finalout = objArr.replace(']', (out.toString() + ']'));
        } else {
            var finalout = objArr.replace(']', (',' + out.toString() + ']'));
        }


        res.write("Welcome to TU20 " + name + ", you can close tab now!"); // find function to automatically close tab after x seconds
        console.log(finalout);

        fs.writeFile('users.json', finalout, function(err) {
            if (err) throw err;
            console.log('-------------------------complete------------------------------');
        });

        res.end();
    });

}).listen(8080); //the server object listens on port 8080