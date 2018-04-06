$(function (){
  $('form').submit(function(event){
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post('/reviews', values);

    posting.done(function(data){

    })
  })
})
