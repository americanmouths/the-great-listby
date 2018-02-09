class ReviewsController < ApplicationController

  def index
    @book = Book.find_by(id: params[:book_id])
  end

  def new
    @review = Review.new
    @book = Book.find_by(id: params[:book_id])
    @user = current_user
  end

  def create
    @review = Review.create(review_params)
    if @review.save
      redirect_to book_review_path(params[:book_id], @review.id)
    else
      render :new
    end
  end

  def show
    @review = Review.find_by(id: params[:id])
    @book = Book.find_by(id: params[:book_id])
  end

  private
    def review_params
      params.require(:review).permit(:title, :content, :book_id, :user_id, :rating)
    end
end
