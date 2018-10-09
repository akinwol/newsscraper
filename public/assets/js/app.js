
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
        $("#notes-list").empty();
        $("#note-description").val("");
        $("#note-title").val("");
        var articleId = $(this).attr("data-id");
        var articleTitle = $(this).attr("data-title");
        $.ajax({
            method: "GET",
            url: `/article/${articleId}`
        }).then(function (data) {
            console.log(data);
            console.log(data._id)
            $(".modal-title").html(`<strong> Notes for: </strong> ${data.title}`);
            $(".modal-footer").html(` <button type="button" class="btn btn-primary save-note" data-id="${data._id}" data-dismiss="modal">Save
            note</button>`);
            if (data.notes){
                data.notes.forEach(element => {
                    $("#notes-list").append(` <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${element.body}

                    <span class="badge badge-primary badge-pill">
                        <button type="button" class="close remove-note" data-dismiss="modal"
                            aria-label="Close" data-id="${element._id}">
                            <span aria-hidden="true" >×</span>
                        </button>
                    </span>
                </li>`)
                });
                
            }
           
        })



    });

// event listener to save a note 
    $(document).on("click", ".save-note", function(){
        var noteDescription = $("#note-description").val().trim();
        // var noteTitle= $("#note-title").val().trim();
        var articleId = $(this).attr("data-id")
        // $("enter-notes").empty();
      
        console.log(noteDescription)
        console.log(`Id: ${articleId}`)
        $.ajax({
            method: "POST",
            url: `/article/${articleId}`,
            data: {
                // title: noteTitle,
                body: noteDescription
            }
        }).then(function(data){
            console.log(data)
        })
    });
//   event listener to remove note 
$(document).on("click", ".remove-note", function(){
    var noteId = $(this).attr("data-id")
    console.log(noteId);
    $.ajax({
        method:"DELETE",
        url: `/deletenote/${noteId}`
    });
})



    // clear all articles 
    $("#clear-articles").on("click", function () {
        $.ajax({
            type: "DELETE",
            url: "/deleteall",
            success: function (response) {
                console.log(respnse);
            }
        })
        window.location.replace("/");
    });

    $("#scrape").on("click", function () {
        $.ajax({
            type:"GET",
            url: "/api/scrape",
            success: function(res){
                console.log(res);
                window.location.href="/"
            }
        })
        // $.get("/api/scrape").then(res =>{
        //     console.log("done")
        // });
        // window.location.href("/");
    })
});