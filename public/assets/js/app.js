
$(function () {

    // add article to favs 
    $(".fav-button").on("click", function () {

        // alert($(this).attr("data-id"));
        var articleId = $(this).attr("data-id");
        console.log(articleId)
        $.ajax({
            type: "PUT",
            url: "/api/saved",
            data: {
                id: articleId
            }

        }).then(function (results) {
            console.log(results)
            window.location.replace("/")
        })
    });

    // remove article from fav 
    $(".fav-delete-button").on("click", function () {

        // alert($(this).attr("data-id"));
        var articleId = $(this).attr("data-id");
        console.log(articleId)
        $.ajax({
            type: "PUT",
            url: "/api/removesaved",
            data: {
                id: articleId
            }

        }).then(function (results) {
            console.log(results)
            window.location.replace("/saved")
        })
    });

    // add a note to article 
    $(".article-note-button").on("click", function () {
        var articleId = $(this).attr("data-id");
        var articleTitle = $(this).attr("data-title");
        $.ajax({
            method: "GET",
            url: `/article/${articleId}`
        }).then(function (data) {
            console.log(data);
            console.log(data._id)
            $(".modal-title").html(`<strong> Notes for: </strong> ${data.title}`);
            $(".save-note").data('id', data._id);
        })



    });

    $(".save-note").on("click", function () {
        var noteDescription = $("#note-description").val().trim();
        $("#note-description").empty();
        console.log(noteDescription)
        console.log(`Id: ${$(this).attr("data-id")}`)

    });



    // clear all articles 
    $("#clear-articles").on("click", function () {
        $.ajax({
            type: "DELETE",
            url: "/deleteall",
            success: function (response) {
                console.log(respnse);
                window.location.replace("/")
            }
        })
    });

    $("#scrape").on("click", function () {
        $.get("/api/scrape", function () {
            window.location.replace("/")
        });
    })
});