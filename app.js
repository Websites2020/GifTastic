var topics = ["Ford", "Chevrolet", "Chrysler", "Honda", "Toyota", "Mazda", "Subaru", "Nissan",];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCarInfo() {

    $("#gifs-appear-here").empty();

  var car = $(this).attr("data-name");
 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    car + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var rating = results[i].rating;

        var imgURL = results[i].images.fixed_height_still.url;

        var image = $("<img>").attr("src", imgURL);

        $(image).addClass("gif");
        
      $("#gifs-appear-here").append(image);

      $("#gifs-appear-here").append("Rating: " + rating);
      
      }
    });
}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    
    a.addClass("car-btn");
    
    a.attr("data-name", topics[i]);
    
    a.text(topics[i]);
   
    $("#buttons-view").append(a);
  }
}

$("#add-car").on("click", function(event) {
  event.preventDefault();

  var car = $("#car-input").val().trim();

  topics.push(car);

  renderButtons();
});

$(document).on("click", ".car-btn", displayCarInfo);

renderButtons();

$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});