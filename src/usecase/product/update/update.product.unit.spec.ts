import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const Product = ProductFactory.create(
  "a",
  "product 1",
  10
);

const input = {
  id: Product.id,
  name: "product 2",
  price: 20
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(Product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const ProductRepository = MockRepository();
    const ProductUpdateUseCase = new UpdateProductUseCase(ProductRepository);

    const output = await ProductUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
