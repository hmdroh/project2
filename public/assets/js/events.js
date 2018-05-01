$(document).ready(function() {

    $(".event-search-form").on("submit", function(e){
        e.preventDefault();
        console.log("sent");

        // make AJAX request with jQuery
        $.ajax({
            method: "GET",
            url: "/events/hiking/92102"
        }).then(function(data){
            console.log(data);
        });
    });
});

