$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();


    $("#DOB").datepicker();




    $("#getzipcode").on("click", function(){
        $.ajax({
            url: "https://ipapi.co/json",
            method: "get"
        }).then(function(data){
            $("#zip-code").val(data.postal);
            $("#zip-code").focus();
        })
        
    })




});