// dependencies
var express = require("express")
var app = express()
var port = 3000;
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var passport = require('passport')
var session = require('express-session')
var mongoose = require("mongoose")
var webmaster = ["27prathamthukral@gmail.com","1thukralpra@hdsb.ca"]

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:8080/user-db")
db = mongoose.connection;

app.listen(port, () => {
    console.log("Server listening on port " + port)
})

// object fields are correspondant with "name" attribute in input fields
var users_schema = new mongoose.Schema({
    name: String,
    email: String,
    prof_pic_src: String,
    grade: Number,
    bio: String
})

var User = mongoose.model("User", users_schema)
module.exports = User

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/test.html")
})

var fe_data
app.post("/adduser", (req, res) => {
    fe_data = new User(req.body)
    var email = fe_data.email
    fe_data.save()
    if (webmaster.includes(email)) {
        res.redirect("/registered?email=" + email)
    } else {
        res.redirect("/registered")
    }
})

app.get("/promote", (req,res)=>{
    var email = req.query.email
    webmaster.push(email)
    res.redirect("/edit_users_table")
})

app.get("/registered", (req, res) => {
    var req_email = req.query.email
    if (webmaster.includes(req_email)) {
        res.sendFile(__dirname + "/registered_master.html")
    } else {
        res.sendFile(__dirname + "/registered.html")
    }
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/test.html")
})

app.get("/checkEmail", (req, res) => {
    var req_email = req.query.email
    var userArr = []
    User.find({}, (err, users) => {
        var userMap = {};
        var numOfUsers = 0;

        userArr = []

        users.forEach((user) => {
            userMap[user._id] = user;
            userArr.push(user.email)
            numOfUsers++;
        })
        after(numOfUsers)
    })

    function after(numOfUsers_param) {
        var email_exists = false
        for (var i = 0; i < numOfUsers_param; i++) {
            if (userArr[i] == req_email) {
                email_exists = true;
                break
            }
        }

        if (email_exists) {
            //webmaster
            if (webmaster.includes(req_email)) {
                res.redirect("/edit_users_table")
            } else {
                res.redirect("/showusers")
            }
        } else {
            res.redirect("/register")
        }
    }


    // res.redirect("/registered")
})

// allows server to access all files in the public folder (css, images, etc.)
app.use(express.static(__dirname + '/public'))

app.get("/showusers", (req, res) => {
    var db = "user-db";
    User.find({}, (err, users) => {
        var userMap = {};
        var numOfUsers = 0;

        var userArr = [
            [], //id column
            [], //name column
            [], //email column
            [] //password column
        ];

        users.forEach((user) => {
            userMap[user._id] = user;

            //store into 2d array - each row is 1 user
            userArr[0].push(user.prof_pic_src)
            userArr[1].push(user.name)
            userArr[2].push(user.email)
            userArr[3].push(user.bio)

            numOfUsers++;
        })

        var html = "<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link href='style/styles.css'><style>.all_users{border:1px solid #333;padding:10px;color:#333}td,tr{border:1px solid #333;border-collapse:collapse;padding:10px;color:#333}body{padding:0px 0px}</style></head><body class='container'><table class='all_users table table-striped'>";
        html += "<tr>";
        html += "<th>Picture</th>";
        html += "<th>Name</th>";
        html += "<th>Email</th>";
        html += "<th>Bio</th>";
        html += "</tr>";

        for (var i = 0; i < numOfUsers; i++) {

            html += "<tr>"
            for (var y = 0; y < 4; y++) {
                if (y == 0) {
                    html += "<td><img src='" + userArr[y][i] + "' alt='Profile Picture'</td>";
                } else {
                    html += "<td>" + userArr[y][i] + "</td>";
                }
            }
            html += "</tr>";

        }

        html += "</table></body></html>";

        res.send(html)
    })
})

app.get("/edit_users_table", (req, res) => {
    var db = "user-db";
    User.find({}, (err, users) => {
        var userMap = {};
        var numOfUsers = 0;

        var userArr = [
            [], //id column
            [], //profile picture
            [], //name column
            [], //email column
            [] //bio column
        ];

        users.forEach((user) => {
            userMap[user._id] = user;

            //store into 2d array - each row is 1 user
            userArr[0].push(user.prof_pic_src)
            userArr[1].push(user.name)
            userArr[2].push(user.email)
            userArr[3].push(user.bio)

            numOfUsers++;
        })

        var html = "<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link href='style/styles.css'><style>.all_users{border:1px solid #333;padding:10px;color:#333}td,tr{border:1px solid #333;border-collapse:collapse;padding:10px;color:#333}body{padding:0px 0px}</style></head><body class='container'><table class='all_users table table-striped'>";
        html += "<tr>";
        html += "<th>Picture</th>";
        html += "<th>Name</th>";
        html += "<th>Email</th>";
        html += "<th>Bio</th>";
        html += "<th>Delete</th>";
        html += "<th>Promote</th>";
        html += "</tr>";

        var disabled_functions = false

        for (var i = 0; i < numOfUsers; i++) {

            html += "<tr>"
            for (var y = 0; y < 4; y++) {
                if (y == 0) {
                    html += "<td><img src='" + userArr[y][i] + "' alt='Profile Picture'</td>";
                } else {
                    html += "<td>" + userArr[y][i] + "</td>";
                }
            }
            html += "<td><a class='btn btn-danger' href='/delete?email=" + userArr[2][i] + "'>Delete</a></td>";
            if(webmaster.includes(userArr[2][i])){
                html += "<td><a class='btn btn-success disabled' href='/promote?email=" + userArr[2][i] + "''>Promote</a></td>";
            }
            else{
                html += "<td><a class='btn btn-success' href='/promote?email=" + userArr[2][i] + "''>Promote</a></td>";   
            }
            
            html += "</tr>";
        }

        html += "</table></body></html>";

        res.send(html)
    })
})

app.delete("/delete")
