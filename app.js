// dependencies
var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var passport = require('passport');
var session = require('express-session');
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:8080/mongo-data");
db = mongoose.connection;

// allows server to access all files in the public server
app.use(express.static('public'))

var users_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
var User = mongoose.model("User", users_schema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/adduser", (req, res) => {
    var myData = new User(req.body);
    myData.save();
    res.redirect("/login.html");
    app.get("/login.html", (req, res) => {
        res.sendFile(__dirname + "/login.html");
    });
    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/login.html");
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: 'DCEeFWf45A53sdfKef424' }),
    function(req, res) {
        // The request will be redirected to LinkedIn for authentication, so this 
        // function will not be called. 
        alert(res)
    });

// app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//     successRedirect: 'https://www.npmjs.com/package/passport-linkedin-oauth2',
//     failureRedirect: 'https://kennahome.jira.com/secure/Dashboard.jspa'
// }));

app.get("/showusers", (req, res) => {
    var db = "mongo-data";
    User.find({}, function(err, users) {
        var userMap = {};
        var numOfUsers = 0;

        var userArr = [
            [], //id column
            [], //name column
            [], //email column
            [] //password column
        ];

        users.forEach(function(user) {
            userMap[user._id] = user;

            //store into 2d array - each row is 1 user
            userArr[0].push(user._id);
            userArr[1].push(user.name);
            userArr[2].push(user.email);
            userArr[3].push(user.password);

            numOfUsers++;
        });

        var html = "<table class='all_users' style='border:1px solid black; border-collapse:collapse;'>";
        html += "<tr>";
        html += "<th>ID</th>";
        html += "<th>Name</th>";
        html += "<th>Email</th>";
        html += "<th>Password</th>";
        html += "</tr>";

        for (var i = 0; i < numOfUsers; i++) {

            html += "<tr>"
            // html+="<td>"+userArr[0][i]+"</td>";
            // html+= "<td>"+userArr[1][i]+"</td>";
            // html+= "<td>"+userArr[2][i]+"</td>";
            // html+= "<td>"+userArr[3][i]+"</td>";
            for (var y = 0; y < 4; y++) {
                html += "<td style='border:1px solid black; border-collapse:collapse; padding:10px;'>" + userArr[y][i] + "</td>";
            }
            html += "</tr>";

        }

        html += "</table>";



        res.send(html);
    });
});


// --------LINKEDIN--------
app.use(passport.initialize());
app.use(passport.session());
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
        clientID: "78hg54dywqls8s",
        clientSecret: "AE9Wk8e1TKiWlxda",
        scope: ['r_emailaddress', 'r_basicprofile'],
        callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}

app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: 'http://127.0.0.1:3000/showusers',
        failureRedirect: '/'
    }));

app.get('/account', ensureAuthenticated, function(req, res) {
    res.render('account', { user: req.user });
});

app.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res) {
        // The request will be redirected to LinkedIn for authentication, so this
        // function will not be called.
    });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/linkedin/callback',
//     passport.authenticate('linkedin', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/');
//     });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});