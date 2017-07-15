var username, email, form_url;
var app = angular.module('myApp', []);
app.controller('MainCtrl', [
    '$scope',
    function($scope) {
    }
]);

$(document).ready(function() {
    $("#print").hide();
    $("#barcode").hide();

    $("#submit").click(function() {
        username = $("#username").val();
        email = $("#email").val();
        
        // generates 7-digit random number - serves as a auth. code
        var secret = Math.floor((Math.random() * 10**10) + 1).toString(36); 
        console.log(secret);
        
        //regular
        var output = "<p>username = "+username+"<br>email = "+email+"<br>code = "+secret+"</p>";
        //JSON
        //var output = '"username":"username","email":"email","code":"secret"';

        $("#print").html(output);
        $("#print").show();

        var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + output + '&amp;size=50x50';

        $('#barcode').attr('src', url);
        $("#barcode").show();
    });
});
