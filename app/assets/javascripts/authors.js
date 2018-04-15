$(document).ready(function(){
  authorsIndex();
  displayBooks();
  nextAuthor();
})

//////////////Constructors & Prototypes//////////////

//Author Constructor
function Author(data){
  this.id = data.id
  this.name = data.name
  this.books = data.books
}

//Author Index Prototype
Author.prototype.indexTemplate = function() {
  let authorHTML = `<a href="/authors/${this.id}" data-id="${this.id}" class="author-show">
  <h2><u>${ this.name }</u></h2>
  </a>
  <div id="authors_books-${this.id}"></div>
  <ul><a href="#" data-id="${this.id}" class="seeBooks" id="books-${this.id}">See Books</a></ul>
  `
  return authorHTML
}

//Prototype for when "See Books" is clicked
Author.prototype.showBooks = function(){
  let authorId = this.id
  this.books.forEach(function(book){
    let bookHTML = `<ul><a href="/books/${book.id}"><li>${book.title}</li></a></ul>`
    $("#authors_books-" + authorId).append(bookHTML)
    $("a#books-" + authorId).hide();
  })
}

//////////////Author Index via AJAX//////////////

//Author Index
function authorsIndex(){
  $.get("/authors.json").done(function(data){
    appendAuthorIndex(data)
    })
  }

//Author Index via LINK in NAV bar
$(document).on('turbolinks:load', function() {
  $('a.author_index').on('click', function(e){
    e.stopPropagation()
      $.get("/authors.json").done(function(data){
        appendAuthorIndex(data)
    })
  })
})

//Append Author Name to Index
function appendAuthorIndex(data){
  data.forEach(function(author){
    let newAuthor = new Author(author)
    let authorHTML = newAuthor.indexTemplate()
    $("#authors_container").append(authorHTML)
  })
}

//Display each Book when See Books link is clicked
function displayBooks(){
  $(document).on('click', '.seeBooks', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.get(`/authors/${id}.json`, appendBooks)
  })
}

//Create author object and call showBooks() prototype on
function appendBooks(data){
  let authorId = data.id
  let newAuthor = new Author(data)
  newAuthor.showBooks()
}

//////////////Author Show via AJAX//////////////

//Show Page via AJAX
$(document).on('turbolinks:load', function() {
  $('a.author-show').on('click', function(e){
    e.stopPropagation()
    let id = $(this).attr('data-id')
      $.get("/authors/" + id + ".json").done(function(data){
        clearDivs();
        appendAuthorShow(data)
    })
  })
})

//Take in data from author show and append to page
function appendAuthorsShow(data){
  let newAuthor = new Author(data)
  newAuthor.booksOnShow();
}

//Author prototype for displaying books on show page
Author.prototype.booksOnShow = function(){
  let authorHTML = `<u>${ this.name }</u>`
  $("#authorName").append(authorHTML)
  this.books.forEach(function(book){
    let bookHTML = `<ul><a href="/books/${book.id}"><li>${book.title}</li></a></ul>`
    $("#authors_books").append(bookHTML)
  })
}

//clear DIVS on show page
function clearDivs(){
  document.getElementById("htmlAuthorName").innerHTML = ""
  document.getElementById("authorName").innerHTML = ""
  document.getElementById("htmlAuthorBooks").innerHTML = ""
  document.getElementById("authors_books").innerHTML = ""
}

//Next Author Via AJAX
function nextAuthor(){
  $(document).on('click', '.js-next', function(e){
    e.preventDefault();
    clearDivs();
    let nextId = parseInt($("a.js-next").attr("data-id")) + 1;
    const url = "/authors/" + nextId + ".json"
    $.ajax({
      url: url,
      method: 'get',
      success: function(data){
        appendAuthorsShow(data)
        $("a.js-next").attr("data-id", data["id"]);
      },
      error: function(response){
        noNextAuthor();
      }
    })
  })
}

//When the next button has no author to render
function noNextAuthor(){
  $('.js-next').hide();
  $('#authorShow').hide();
  const html = "<p>Sorry there is no next author</p>"
  $("#authorError").append(html)
}
