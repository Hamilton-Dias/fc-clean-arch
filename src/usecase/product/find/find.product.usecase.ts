import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputFindProductDto,
  OutputFindProductDto,
} from "./find.product.dto";

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const Product = await this.productRepository.find(input.id);

    return {
      id: Product.id,
      name: Product.name,
      price: Product.price
    };
  }
}
