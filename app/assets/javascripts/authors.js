
$(document).ready(function(){
  displayAuthorBooks();
  authorsIndex();
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

//display books by each author from author index
function displayAuthorBooks(){
  $(".js-more").on('click', function(){
    var id = $(this).data("id")
    $.get("/authors/" + id + ".json", function(data){
      var books = data["books"]
      var bookTitles = books.map(book => book.title)
      $("#body-" + id).text(bookTitles)
    })
  })
}
