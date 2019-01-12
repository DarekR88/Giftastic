// array of cartoon characters for the buttons that will show up on the page
var loadGifs = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Yosemite Sam", "Tweety Bird", "Foghorn Leghorn", "Sylvester the cat"];

// for loop that creates a button for the cartoon characters in the loadGifs array
function makeButtons() {
  $("#buttons").empty();
  for(var i=0; i < loadGifs.length; i++){
      var gifBtn = $("<button>");
      gifBtn.addClass("gifButton");
      gifBtn.attr("toonName", loadGifs[i]);
      $(gifBtn).text(loadGifs[i]);
      $("#buttons").append(gifBtn);
  };
};
// function for adding new buttons to the button list research prevent default 
var userInput;
$(".submitButton").click(function(event){
  event.preventDefault();
  userInput = $("#toonInput").val().trim();
  console.log(userInput);
  if (userInput != ""){
    loadGifs.push(userInput);
  };
  console.log(loadGifs);
  makeButtons();
  $("#toonInput").val('');
});

makeButtons();

// variable for holding the limit of the query
var limit = 10; 
// variable for storing "this"
var toon;
// variable that represents the giphy query search and images
var searchObject;
var gifStill;
var gifPlaying;
var rating;
var still;
// varaible for the gif being played or not
var playingGif = false;
// funciton for creating a query based on the button clicked 
$(document).on('click','.gifButton',function(){
   $("#gifs").empty();
   $("#gifsTwo").empty();
   limit = 10;
   toon = $(this).attr("toonName");
   $(".addGifs").attr("toonName", toon)
   var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + toon + "&api_key=fk15UAOOrgq9oDZfXGgEc9XPVbDuh715&limit=" + limit + "";
   console.log(toon);
   $.ajax({
    url: giphyUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // for loop that goes through the data array and displays the images recieved from the query
    for (var i = 0; i < response.data.length; i++){
      // create a variable that will hold the url of the desired image
      still = response.data[i].images.downsized_still.url;
      // variable that will hold the ratings 
      rating = response.data[i].rating
      // variable that holds the url of animated gif
      gifPlaying = response.data[i].images.original.url
      // add the still images to the html
      if (i <= 4){
        $("#gifs").append("<figure><img class='stillGif' id='playGif' src= " + still + " animated=" + gifPlaying + " stillImage=" + still + " imageState='notPlaying' height='200' width='300'><figcaption>Rating: " + rating + "</figcaption></figure>");
      } else {
        $("#gifsTwo").append("<figure><img class='stillGif' id='playGif' src= " + still + " animated=" + gifPlaying + " stillImage=" + still + " imageState='notPlaying' height='200' width='300'><figcaption>Rating: " + rating + "</figcaption></figure>");
      };
    };     
  });
});

// function for adding more gifs to the page 
      $(".addGifs").click(function(){
          limit +=10
          console.log(limit)
          toon = $(this).attr("toonName");
          var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + toon + "&api_key=fk15UAOOrgq9oDZfXGgEc9XPVbDuh715&limit=" + limit + "";
          console.log(toon);
          $.ajax({
           url: giphyUrl,
           method: "GET"
         }).then(function(response){
           console.log(response)
           for (var i = 0; i < response.data.length; i++){
            // create a variable that will hold the url of the desired image
            still = response.data[i].images.downsized_still.url;
            // variable that will hold the ratings 
            rating = response.data[i].rating
            // variable that holds the url of animated gif
            gifPlaying = response.data[i].images.original.url
            // add the still images to the html
            if (i > (limit -11) && i < (limit -5)){
              $("#gifs").append("<figure><img class='stillGif' id='playGif' src= " + still + " animated=" + gifPlaying + " stillImage=" + still + " imageState='notPlaying' height='200' width='300'><figcaption>Rating: " + rating + "</figcaption></figure>");
            } else if (i > (limit -6)) {
              $("#gifsTwo").append("<figure><img class='stillGif' id='playGif' src= " + still + " animated=" + gifPlaying + " stillImage=" + still + " imageState='notPlaying' height='200' width='300'><figcaption>Rating: " + rating + "</figcaption></figure>");
            }
          }
         })
      })

      $(document).on('click','.stillGif',function(){
        state = $(this).attr("imageState")
        imageSrc = $(this).attr("src");
        animeGifUrl = $(this).attr("animated");
        stillUrl = $(this).attr("stillImage");
        if (state === "notPlaying"){
          $(this).attr("src", animeGifUrl);
          $(this).attr("imageState", "playing")
        } else if (state === "playing"){
          $(this).attr("src", stillUrl);
          $(this).attr("imageState", "notPlaying");
        };
      });


