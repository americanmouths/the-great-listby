$(document).ready(function(){
  hideAuthorLink();
  authorsIndex();
  displayAuthorBooks();
  authorShowPage();
  showNextAuthor();
  authorHomeLink();
})

//Author constructor
function Author(authorData){
  this.id = authorData.id
  this.name = authorData.name
  this.books = authorData.books
}

//Author prototype
Author.prototype.indexTemplate = function() {
  let authorHTML = `<a href="/authors/${this.id}" data-id=${this.id} class="author_show"><h2>${ this.name }</h2></a>`
  return authorHTML
}


//display author index
function authorsIndex(){
  $.getJSON("/authors").done(function(data){
    data.forEach(function(entry){
      var id = entry.id
      var name = entry.name
      $("#title-" + id).text(name)
    })
  })
}

// document.addEventListener("DOMContentLoaded", function(event){
//   console.log(event)
// })

//prevent html display from home page link
function authorHomeLink(){
  $("a.author_index").on('click', function(e){
    e.preventDefault();
    $.getJSON(this.href + ".json").done(function(data){
      data.forEach(function(entry){
        var id = entry.id
        var name = entry.name
        $("#title-" + id).text(name)
      })
    })
  })
}

//hide more info about author link on author index until button click
function hideAuthorLink(){
  $("div#author_link").hide()
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
  $(".js-next").on("click", function(e){
    e.preventDefault();
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/authors/" + nextId + ".json", function(data){
      $(".authorName").text(data["name"])
      // var bookLis = data["books"].map(function (book){
      // return "<li>" + book["title"] + "</li>"}).join('');
      // $("#books-" + nextId).html(bookLis)
      $(".js-next").attr("data-id", data["id"]);
    })
  })
}
