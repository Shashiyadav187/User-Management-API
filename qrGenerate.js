var username, email, form_url, jsobj;

var app = angular.module('myApp', []);
app.controller('MainCtrl', [
    '$scope',
    function($scope) {}
]);

$(document).ready(function() {
    $("#print").hide();
    $("#barcode").hide();
    $(".btn-danger").hide();
    $(".invalid-login").hide();

    //login page
    $("#submit").click(function() {
        //values
        username = $("#username").val();
        email = $("#email").val();
        var login_success = true;

        //validate login
        $.getJSON('users.json', function(data) {
            data = $.parseJSON('data');
        });

        if (login_success) {
            // generates 7-digit random number - serves as a auth. code
            var secret = Math.floor((Math.random() * Math.pow(10, 17)) + 1).toString(36);
            console.log(secret);

            //regular
            var output = "<p>username = " + username + "<br>email = " + email + "<br>code = " + secret + "</p>";
            //JSON
            //var output = '"username":"username","email":"email","code":"secret"';

            $("#print").html(output);
            $("#print").show();

            var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + output + '&amp;size=50x50';

            $('#barcode').attr('src', url);
            $("#barcode").show();
        } else {
            //if incorrect
            $(".invalid-login").show();
        }
    });

    //sign up page
    $("#signUp").click(function() {
        //values
        username = $("#username").val();
        email = $("#email").val();
        var url = 'http://localhost:8080/?name=' + username + '&email=' + email;

        $("#finalSubmit").attr("href", url);
        $(".btn-danger").fadeIn();

    });

    $(".btn-danger").click(function() {
        $(this).fadeOut();
    });
});