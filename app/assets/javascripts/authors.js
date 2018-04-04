///////DISPLAYING INDEX///////

//Author constructor
function Author(authorData){
  this.id = authorData.id
  this.name = authorData.name
  this.books = authorData.books
}

//Author prototypes
Author.prototype.indexTemplate = function() {
  let authorHTML = `<a href="/authors/${this.id}" data-id="${this.id}" class="author-show">
  <h2><u>${ this.name }</u></h2>
  </a>
  <div id="authors_books-${this.id}"></div>
  <ul><a href="#" data-id="${this.id}" class="displayBooks" id="books-${this.id}">See Books</a></ul>
  `
  return authorHTML
}

Author.prototype.showTemplate = function() {
  let authorShowHTML = `<h2>${this.name}</h2>`
  return authorShowHTML
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

//Render each book & hide see book link on click
function renderBooks(bookData){
  var authorId = bookData.id
bookData["books"].forEach(function(book){
    let newBook = new Book(book)
    let bookHTML = newBook.showTemplate()
    $("#authors_books-" + authorId).append(bookHTML)
    $("a#books-" + authorId).hide();
  })
}

//Book Constructor
function Book(bookData) {
  this.id = bookData.id
  this.title = bookData.title
}

//Book prototype
Book.prototype.showTemplate = function(){
  let bookHTML = `<ul><a href="/books/${this.id}"><li>${this.title}</li></a></ul>`
  return bookHTML
}

//////NEXT AUTHOR VIA SHOW PAGE/////
$(function (){
  $(".js-next").on("click", function(e){
    e.preventDefault();
    $("#authorName").html('');
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/authors/" + nextId + ".json", function(data){
      $("#authorName").text(data["name"])
    })
  })
})

$(document).ready(function(){
  authorsIndex();
  displayBooks();
})



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
