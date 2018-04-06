$(function (){
  $('form').on('submit', function(e){
    e.preventDefault();
    var userId = document.getElementById("userId").value
    var bookId = document.getElementById("bookId").value

    var values = $(this).serialize();
    var posting = $.post('/books/' + bookId + '/reviews', values);

    posting.done(function(data){
      var review = data;
      $('#reviewTitle').text(review["title"])
      $('#reviewContent').text(review["content"])
      $('#reviewRating').text(review["rating"])
    })
  })
})
