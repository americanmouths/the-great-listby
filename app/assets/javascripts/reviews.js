//Review Constructor
function Review(data){
  this.id = data.id
  this.title = data.title
  this.content = data.content
  this.rating = data.rating
}

//Review Prototype
Review.prototype.showReview = function(){
  reviewHTML = `<h2>${this.title}</h2>
  <p>Content: ${this.content}</p>
  <p>Rating: ${this.rating}</p>
  <hr>`

  return reviewHTML
}

//Submit New Review Via Ajax
$(function (){
  $('form').on('submit', function(e){
    e.preventDefault();
    const formPostUrl = $(this).attr("action")
    const formData = $(this).serialize();
    $.ajax({
      url: formPostUrl,
      method: 'post',
      data: formData,
      success: function(data) {
        resetformFields();
        const newReview = new Review(data);
        const showNewReview = newReview.showReview();
        $("div#reviewResult").append(showNewReview)
      },
      error: function(response) {
        $('div#reviewErrors').html("Sorry, there was an error. Please try again.")
      }
    });
  });
})

//Reset All Form Fields
function resetFormFields(){
  $('#title').val("");
  $('#content').val("");
  $('#rating').val("");
  $('#new_review input:submit').prop('disabled',false);
}
