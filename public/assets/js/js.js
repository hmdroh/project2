$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();


    $("#DOB").datepicker();




    $("#getzipcode").on("click", function () {
        $.ajax({
            url: "https://ipapi.co/json",
            method: "get"
        }).then(function (data) {
            $("#zip-code").val(data.postal);
            $("#zip-code").focus();
        });



    })


    //checking if the user is logged in or not:
    // $.ajax({
    //     url: "/api/user_data",
    //     method: "get"
    // }).then(function(data){
    //     if(data){
    //         alert("User is logged in");
    //     }else{
    //         alert("User is not logged in");
    //     }
    // });

});