$(document).ready(function(){
  authorsIndex();
  displayBooks();
})

///////DISPLAYING INDEX///////

//Author constructor
function Author(authorData){
  this.id = authorData.id
  this.name = authorData.name
  this.books = authorData.books
}

//Author prototype
Author.prototype.indexTemplate = function() {
  let authorHTML = `<a href="/authors/${this.id}" data-id="${this.id}" class="author_show">
  <h2><u>${ this.name }</u></h2>
  </a>
  <div id="authors_books-${this.id}"></div>
  <ul><li><a href="#" data-id="${this.id}" class="displayBooks">See Books</a></li></ul>
  `
  return authorHTML
}

//Author Index
function authorsIndex(){
  $.getJSON("/authors").done(function(data){
    data.forEach(function(author){
      let newAuthor = new Author(author)
      let authorHTML = newAuthor.indexTemplate()
      $("#authors_container").append(authorHTML)
    })
  })
}

////DISPLAY BOOKS WITH AJAX ON SAME INDEX PAGE/////
function displayBooks(){
  $(document).on('click', '.displayBooks', function(e){
    e.preventDefault();
    $("#books_container").html('')
    let id = $(this).attr('data-id')
    $.getJSON(`/authors/${id}.json`, renderBooks)
  })
}

//  function homeLink(){
//   $(document).on('click', '.author_index', function(e){
//     e.preventDefault()
//   })
// }

// // document.addEventListener("DOMContentLoaded", function(event){
// //   console.log(event)
// // })

// //hide more info about author link on author index until button click
// function hideAuthorLink(){
//   $("div#author_link").hide()
// }
//

// //function for showing next author on next author click
// function showNextAuthor(){
//   $(".js-next").on("click", function(e){
//     e.preventDefault();
//     var nextId = parseInt($(".js-next").attr("data-id")) + 1;
//     $.get("/authors/" + nextId + ".json", function(data){
//       $(".authorName").text(data["name"])
//       // var bookLis = data["books"].map(function (book){
//       // return "<li>" + book["title"] + "</li>"}).join('');
//       // $("#books-" + nextId).html(bookLis)
//       $(".js-next").attr("data-id", data["id"]);
//     })
//   })
// }
