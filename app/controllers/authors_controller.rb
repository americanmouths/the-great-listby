class AuthorsController < ApplicationController
  def index
    @authors = Author.alphabatize
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @authors }
    end
  end

  def show
    @author = Author.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @author }
    end
  end
end
