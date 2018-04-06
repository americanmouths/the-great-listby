$(document).ready(function(){
  authorsIndex();
  displayBooks();
  authorsIndexLink();
  nextAuthor();
  authorsShow();
})

///////DISPLAYING INDEX///////

//Author constructor
function Author(authorData){
  this.id = authorData.id
  this.name = authorData.name
  this.books = authorData.books
}

//Author Index Prototype
Author.prototype.indexTemplate = function() {
  let authorHTML = `<a href="/authors/${this.id}" data-id="${this.id}" class="author-show">
  <h2><u>${ this.name }</u></h2>
  </a>
  <div id="authors_books-${this.id}"></div>
  <ul><a href="#" data-id="${this.id}" class="displayBooks" id="books-${this.id}">See Books</a></ul>
  `
  return authorHTML
}

//Author Show Prototype
Author.prototype.showTemplate = function() {
  let authorHTML = `<u>${ this.name }</u>`
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
function nextAuthor(){
  $(document).on('click', '.js-next', function(e){
    e.preventDefault();

    //clear all divs
    document.getElementById("htmlAuthorName").innerHTML = ""
    document.getElementById("authorName").innerHTML = ""
    document.getElementById("htmlAuthorBooks").innerHTML = ""
    document.getElementById("authors_books").innerHTML = ""

    //get next author id
    var nextId = parseInt($("a.js-next").attr("data-id")) + 1;
    $.get("/authors/" + nextId + ".json", function(data){

      //append author name
      var newAuthor = new Author(data)
      var authorHTML = newAuthor.showTemplate()
      $("#authorName").append(authorHTML)

      //append author books
      data["books"].forEach(function(book){
        let newBook = new Book(book)
        let bookHTML = newBook.showTemplate()
        $("#authors_books").append(bookHTML)
      })

      //reset id
      $("a.js-next").attr("data-id", data["id"]);
    })
  })
}

//LINK IN HEADER AUTHORS INDEX VIA AJAX
function authorsIndexLink(){
  $(document).on('click', 'a.author_index', function(){
    $.get("/authors").done(function(){
      $.getJSON("/authors").done(function(data){
        data.forEach(function(author){
          let newAuthor = new Author(author)
          let authorHTML = newAuthor.indexTemplate()
          $("#authors_container").append(authorHTML)
        })
      })
    })
  })
}

//get show page via ajax when click on authors from author index
function authorsShow(){
  $(document).on('click', 'a.author-show', function(){
    let id = $(this).attr('data-id')
    $.get("/authors/" + id).done(function (){
      $.getJSON("/authors/" + id).done(function(data){
        document.getElementById("htmlAuthorName").innerHTML = ""
        document.getElementById("authorName").innerHTML = ""
        document.getElementById("htmlAuthorBooks").innerHTML = ""
        document.getElementById("authors_books").innerHTML = ""

        //append author name
        var newAuthor = new Author(data)
        var authorHTML = newAuthor.showTemplate()
        $("#authorName").append(authorHTML)

        //append author books
        data["books"].forEach(function(book){
          let newBook = new Book(book)
          let bookHTML = newBook.showTemplate()
          $("#authors_books").append(bookHTML)
          })
        })
      })
    })
  }
