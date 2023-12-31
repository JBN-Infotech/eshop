class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]

  # GET /products
  def index
    
    @products = Product.all
    @products = @products.where('name like ?', "%#{params[:searchText]}%") if !params[:searchText].blank?
    @products = @products.where('quantity > ?', 0) if !params[:available].blank?
    puts "aaaa=#{params[:ids]}"
    @products = @products.where(id: params[:ids]) if !params[:ids].blank?

    puts "products=#{@products.inspect}"

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: {message: @product.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: {message: @product.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :description, :category_id, :quantity, :price)
    end
end
