$(document).ready(function(){
  genreIndexLink();
  genreIndex();
})

//Genre Constructor

function Genre(data){
  this.id = data.id
  this.name = data.name
}

//Genre Index Prototype
Genre.prototype.indexTemplate = function(){
  let genreHTML = `<li><a href="genres/${this.id}"><u>${ this.name }</u></a></li>`
  return genreHTML
}


//Get Req to Genres
function genreIndex(){
  $.getJSON("/genres").done(function(data){
    appendGenreIndex(data)
  })
}

//Fire Ajax when Genre Link clicked in Nav Bar
function genreIndexLink(){
  $(document).on('click', 'a.genre_index', function(){
    $.get("/genres").done(function(){
      $.getJSON("/genres").done(function(data){
        appendGenreIndex(data)
      })
    })
  })
}

//Append Genre Index to Page
function appendGenreIndex(data){
  data.forEach(function(genre){
    let newGenre = new Genre(genre)
    let genreHTML = newGenre.indexTemplate()
    $("#genres_container").append(genreHTML)
  })
}
