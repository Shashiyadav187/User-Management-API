var username, email, form_url;

$(document).ready(function() {
    $("#print").hide();
    $("#barcode").hide();

    $("#submit").click(function() {
        username = $("#username").val();
        email = $("#email").val();
        /*form_url = "https://docs.google.com/forms/d/e/1FAIpQLSdlieL-MueTJYpfIqZk2JWTjVnINterPEHgRxUISu-aL7DbJA/formResponse?usp=pp_url&entry.920234751=" + username + "&entry.406371071=" + email;
        form_url = encodeURI(form_url);
        console.log(form_url);
        
        $("#print").attr("href", form_url);*/
        $("#print").text("username: "+username+" email: "+email);
        $("#print").show();

        /*var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + "https://goo.gl/dAGny3" + '&amp;size=50x50';*/
        
        var output = "username = "+username+" email = "+email;

        var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + output + '&amp;size=50x50';

        $('#barcode').attr('src', url);
        $("#barcode").show();
    });
});
