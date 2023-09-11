import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const Product = await this.ProductRepository.find(input.id);
    Product.changeName(input.name);
    Product.changePrice(input.price);

    await this.ProductRepository.update(Product);

    return {
      id: Product.id,
      name: Product.name,
      price: Product.price
    };
  }
}
