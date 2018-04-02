$(document).ready(function(){
  hideAuthorLink();
  authorsIndex();
  displayAuthorBooks();
  authorShowPage();
  showNextAuthor();
})

//author index - got data onto page - it's not formatted but at least got via ajax
function authorsIndex(){
  $.get("/authors.json").done(function(data){
    data.forEach(function(entry){
      var id = entry.id
      var name = entry.name
      $("#title-" + id).text(name)
    })
  })
}

// prevent html display from home page link
function authorHomeLink(){
  $("#author_index").on('click', function(e){
    e.preventDefault();
    authorsIndex();
  })
}
//hide more info about author link on author index until button click
function hideAuthorLink(){
  $("#author_link").hide()
}

//display books by each author from author index
function displayAuthorBooks(){
  $(".js-more").on('click', function(){
    $("#author_link").show();
    var id = $(this).data("id")
    $.get("/authors/" + id + ".json", function(data){
      var bookLis = data["books"].map(function (book){
      return "<li>" + book["title"] + "</li>"}).join('');
      $("#body-" + id).html(bookLis)
    })
  })
}

//function for when "more info about author" is clicked - should go to show page
function authorShowPage(){
  $("a.author_show").on('click', function(){
    $.get(this.href + ".json", function(data){
      var id = data["id"]
      var bookLis = data["books"].map(function (book){ //display books
        return "<li>" + book + "</li>"}).join('');
        $(".authorName").text(data["name"]);
        $("#books-" + id).html(bookLis)
      })
    })
  }

//function for showing next author on next author click
function showNextAuthor(){
  $(".js-next").on("click", function(){
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/authors" + nextId + ".json", function(data){
      $(".authorName").text(data["name"])
      var bookLis = data["books"].map(function (book){ //display books
      return "<li>" + book["title"] + "</li>"}).join('');
      $("#books-" + nextId).html(bookLis)
      $(".js-next").attr("data-id", data["id"]); //reset id
    })
  })
}
