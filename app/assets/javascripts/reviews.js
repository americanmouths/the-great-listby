$(function (){
  $('form').submit(function(event){
    event.preventDefault();

    var userId = document.getElementById("userId").value
    var bookId = document.getElementById("bookId").value

    var values = $(this).serialize();
    var posting = $.post('/books/' + bookId + '/reviews', values);

    posting.done(function(data){


    })
  })
})
