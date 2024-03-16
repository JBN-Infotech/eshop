class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show update destroy ]
  # GET /categories
  def index
    if params[:searchText]
      @categories = Category.where('name ILIKE ?', "%#{params[:searchText]}%").order('name')
    else
      @categories = Category.all
    end

    render json: @categories
  end

  # GET /categories/1
  def show
    render json: @category
  end

  # POST /categories
  def create
    @category = Category.new(category_params)

    if @category.save
      render json: @category, status: :created
    else
      render json: {message: @category.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: {message: @category.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find_by_id(params[:id])
      if !@category
        render json: {message: "Category with id '#{params[:id]}' does not exists."}, status: :unprocessable_entity
      end
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name, :description, :active)
    end
end
