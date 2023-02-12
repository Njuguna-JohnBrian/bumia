import { Response, Request, NextFunction } from "express";
import { Product } from "../models/product.model";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { ErrorHandler } from "../utils/errorHandler.utils.";
import { ControllerMessages } from "../interfaces/error.interface";
import ApiFeatures from "../utils/apiFeatures.utils";

/**Get Single Product
 *
 * /product/:`id`
 *
 * @param {*} req request body with `id` as parameter
 * @param {*} res response body with the found product
 *
 */
const getSingleProduct = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler(
          `${ControllerMessages.PRODUCT_NOT_FOUND} ${req.params.id} not found`,
          404
        )
      );
    }

    return res.status(200).json({
      success: true,
      product,
    });
  }
);

/**Get All Products
 *
 * /products?keyword=apple
 *
 * @param {*} req request body with query keyword or empty keyword query string
 * @param {*} res response body with the found products
 *
 */
const getAllProducts = CatchAsyncErrors(async (req: Request, res: Response) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const products = await apiFeatures.query;

  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

/**Create Product
 *
 * /product/new
 *
 * @param {*} req request body with product details
 * @param {*} res response body with the new product
 *
 */
const createProduct = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.create(req.body);

    if (!product) {
      return next(
        new ErrorHandler(`${ControllerMessages.PRODUCT_CREATE_FAIL}`, 404)
      );
    }

    return res.status(200).json({
      success: true,
      product,
    });
  }
);

/**Update Product
 *
 * /product/:id
 *
 * @param {*} req request body with new product details
 * @param {*} res response body with the new product
 *
 */
const updateProduct = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler(
          `${ControllerMessages.PRODUCT_NOT_FOUND} ${req.params.id} not found`,
          404
        )
      );
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      product,
    });
  }
);

/**Delete Product
 *
 * /product/:id
 *
 * @param {*} req request body with product to delete
 * @param {*} res response body with delete message
 *
 */
const deleteProduct = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(
        new ErrorHandler(
          `${ControllerMessages.PRODUCT_NOT_FOUND} ${req.params.id} not found`,
          404
        )
      );
    }

    await product.remove();

    return res.status(200).json({
      success: true,
      message: `${ControllerMessages.PRODUCT_NOT_FOUND} ${req.params.id} deleted`,
    });
  }
);

export {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
