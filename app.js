var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var passport = require('passport');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:8080/mongo-data");

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
    clientID: "78hg54dywqls8s",
    clientSecret: "AE9Wk8e1TKiWlxda",
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
}, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect... 
    process.nextTick(function() {
        // To keep the example simple, the user's LinkedIn profile is returned to 
        // represent the logged-in user. In a typical application, you would want 
        // to associate the LinkedIn account with a user record in your database, 
        // and return that user instead. 
        return done(null, profile);
    });
}));

var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/adduser", (req, res) => {
    var myData = new User(req.body);
    myData.save();

    //res.send( "Welcome to TU20! Redirecting you to the login page...." )
    var email = myData.email;
    res.sendFile(__dirname + "/login.html"); //redirects so the user can now login

});

var userArr = [];
app.get("/showusers", (req, res) => {

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/auth/linkedin',
    passport.authenticate('linkedin', { state: 'DCEeFWf45A53sdfKef424' }),
    function(req, res) {
        // The request will be redirected to LinkedIn for authentication, so this 
        // function will not be called. 
    });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: 'https://www.npmjs.com/package/passport-linkedin-oauth2',
    failureRedirect: 'https://kennahome.jira.com/secure/Dashboard.jspa'
}));