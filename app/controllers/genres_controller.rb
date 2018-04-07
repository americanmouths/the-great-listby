class GenresController < ApplicationController

  def index
    @genres = Genre.alphabatize
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @genres }
    end
  end

  def show
    @genre = Genre.find_by(id: params[:id])
  end

end
