$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.parallax').parallax();
    

    $(".datepicker").datepicker({
        yearRange: [1918, 2018],
        maxDate: new Date()
    });


    $("#getzipcode").on("click", function () {
        $.ajax({
            url: "https://ipapi.co/json",
            method: "get"
        }).then(function (data) {
            $("#zip-code").val(data.postal);
            $("#zip-code").focus();
        });
    })
});