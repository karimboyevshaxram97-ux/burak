import ProductModel from "../schema/Product.models";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }
}

export default ProductService;