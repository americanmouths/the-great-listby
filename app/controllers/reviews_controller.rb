class ReviewsController < ApplicationController
  before_action :set_current_user

  def index
    @book = Book.find_by(id: params[:book_id])
  end

  def new
    authorize! :create, Review
    @review = Review.new
    @book = Book.find_by(id: params[:book_id])
  end

  def create
    @review = Review.create(review_params)
    #if @review.save
      #redirect_to book_review_path(params[:book_id], @review.id)
    #else
      #@book = Book.find_by(id: params[:book_id])
      #render :new
    #end
    render json: @review, status: 201
  end

  def show
    find_review_by_book
  end

  def edit
    find_review_by_book
  end

  def update
    find_review_by_book
    authorize! :update, @review
    @review.update(review_params)
    redirect_to book_review_path(@book, @review)
  end

  def destroy
    find_review_by_book
    authorize! :destroy, @review
    @review.destroy
    redirect_to book_path(@book)
  end

  private
    def review_params
      params.require(:review).permit(:title, :content, :book_id, :user_id, :rating)
    end

    def set_current_user
      @user = current_user
    end

    def find_review_by_book
      @review = Review.find_by(id: params[:id])
      @book = Book.find_by(id: params[:book_id])
    end

end
