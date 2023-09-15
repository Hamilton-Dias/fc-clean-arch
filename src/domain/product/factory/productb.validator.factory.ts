import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";
import ProductBYupValidator from "../validator/productb.yup.validator";

export default class ProductBValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductBYupValidator();
  }
}
