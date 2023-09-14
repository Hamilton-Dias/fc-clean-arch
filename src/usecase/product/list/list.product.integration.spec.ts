import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const productA = new Product("123", "product 1", 10);
    const productB = new Product("1234", "product 2", 20);

    await productRepository.create(productA);
    await productRepository.create(productB);

    const result = await usecase.execute({});

    expect(result).toEqual({Products: [{
      id: expect.any(String),
      name: "product 1",
      price: 10
    },
    {
      id: expect.any(String),
      name: "product 2",
      price: 20
    }]});
  });
});
