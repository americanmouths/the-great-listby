$(document).ready(function(){
  hideAuthorLink();
  authorsIndex();
  displayAuthorBooks();
  authorShowPage();
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
      var books = data["books"]
      var bookTitles = books.map(book => book.title)
      $("#body-" + id).text(bookTitles)
    })
  })
}

//function for when "more info about author" is clicked - should go to show page
function authorShowPage(){
  $("a.author_show").on('click', function(){
    $.get(this.href + ".json", function(data){
      var id = data["id"]

      var bookLis = data["books"].map(function (book){
        return "<li>" + book + "</li>"}).join('');

        $(".authorName").text(data["name"]);
        $("#books-" + id).html(bookLis)
      })
    })
  }
