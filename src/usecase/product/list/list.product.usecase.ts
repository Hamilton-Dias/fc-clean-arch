import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto,
} from "./list.product.dto";

export default class ListProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const Products = await this.ProductRepository.findAll();
    return OutputMapper.toOutput(Products);
  }
}

class OutputMapper {
  static toOutput(Product: Product[]): OutputListProductDto {
    return {
      Products: Product.map((Product) => ({
        id: Product.id,
        name: Product.name,
        price: Product.price
      })),
    };
  }
}
