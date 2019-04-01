var emotions = ["Embarrased", "Excited", "Drunk", "Sassy", "Shocked", "Sick", "Stressed", "Lonely", "Angry", "Bored", "Frustated", "Inspired", "Relaxed", "Love", "Pain", "Suspicious", "Tired", "Reaction"];

window.onload = function () {

    function renderButtons() {
        $("#buttons-display").empty();
        for (var i = 0; i < emotions.length; i++) {

            var a = $("<button>");
            a.addClass("emotion btn btn-secondary m-1");
            a.attr("data-search", emotions[i]);
            a.text(emotions[i]);
            $("#buttons-display").append(a);
        }
    }
    $("#add-emotion").on("click", function (event) {
        event.preventDefault();
        var emotion = $("#emotion-input").val().trim();
        emotions.push(emotion);
        renderButtons();
        console.log("Index length: " + emotions.length);
        getGiphy();
    });

    renderButtons();

    function getGiphy() {
        console.log("tarado");
        $(".emotion").on("click", function () {
            var still = true;
            //$("#display-emotion").empty();
            var searchEmotion = $(this).attr("data-search");
            console.log(searchEmotion);
            var apikey = "Tm1tIaZoo9qvcyKD3U7BPP0kXPfzR7rS";
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + searchEmotion + "&limit=10&offset=0&rating=PG&lang=en";
            console.log("URL: " + queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var p1 = $("<p id=rating>").text("Rating: " + results[i].rating);
                        var p2 = $("<p id=title>").text("Title: " + results[i].title.substring(16,0));

                        var gifEmotion = $("<img>");
                        gifEmotion.attr("src", results[i].images.fixed_height_still.url);
                        gifEmotion.attr("data-still", results[i].images.fixed_height_still.url);
                        gifEmotion.attr("data-animate", results[i].images.fixed_height.url);
                        gifEmotion.attr("data-state", "still");
                        gifEmotion.addClass("gifs")

                        $("#display-emotion").append(gifEmotion);
                        $("#display-emotion").append(p1);
                        $("#display-emotion").append(p2);

                    }
                    $(".gifs").on("click", function () {
                        var state = $(this).attr("data-state");

                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                });

        });
    }
    getGiphy();
}