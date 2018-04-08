$(document).ready(function(){
  genreIndex();
  displayGenreBooks();
})

//Genre Constructor
function Genre(data){
  this.id = data.id
  this.name = data.name
}

//Genre Index Prototype
Genre.prototype.indexTemplate = function(){
  let genreHTML = `<a href="genres/${this.id}"><h2><u>${ this.name }</u></h2></a>
  <div id="genre_books-${this.id}"></div>
  <ul><a href="#" data-id="${this.id}" class="seeBooks" id="books-${this.id}">See Books In This Genre</a></ul>`
  return genreHTML
}

//Get Req to Genres
function genreIndex(){
  $.getJSON("/genres").done(function(data){
    appendGenreIndex(data)
  })
}

//Fire Ajax when Genre Link clicked in Nav Bar
$(document).on('turbolinks:load', function() {
  $('a.genre_index').on('click', function(e){
    e.stopPropagation()
      $.getJSON("/genres").done(function(data){
        appendGenreIndex(data)
    })
  })
})

//Append Genre Index to Page
function appendGenreIndex(data){
  data.forEach(function(genre){
    let newGenre = new Genre(genre)
    let genreHTML = newGenre.indexTemplate()
    $("#genres_container").append(genreHTML)
  })
}

//Display each Book when See Books link is clicked
function displayGenreBooks(){
  $(document).on('click', '.seeBooks', function(e){
    e.preventDefault();
    let id = $(this).attr('data-id')
    $.getJSON(`/genres/${id}.json`, appendGenreBooks)
  })
}

//Render each book & hide see book link on click
function appendGenreBooks(data){
  let genreId = data.id
  data["books"].forEach(function(book){
    let newBook = new Book(book)
    let bookHTML = newBook.showTemplate()
    $("#genre_books-" + genreId).append(bookHTML)
    $("a#books-" + genreId).hide();
  })
}
