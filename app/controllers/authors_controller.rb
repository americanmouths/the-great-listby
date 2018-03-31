class AuthorsController < ApplicationController
  def index
    @authors = Author.alphabatize
    render json: @authors, status: 200
  end

  def show
    @author = Author.find_by(id: params[:id])
  end
end
