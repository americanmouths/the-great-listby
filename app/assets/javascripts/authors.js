$(document).ready(function(){
  displayAuthorBooks();
})

//authors index
// function displayAuthors(){
//   $.get("/authors.json").done(function(data){
//     $(".js-more").on('click', function(){
//       var id = $(this).data("id")
//       debugger;
//     })
//   });
// }

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
