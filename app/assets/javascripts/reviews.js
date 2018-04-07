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
