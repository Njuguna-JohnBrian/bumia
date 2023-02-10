import { Response, Request, NextFunction } from "express";
import { Product } from "../models/product.model";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";
import { ErrorHandler } from "../utils/errorHandler.utils.";

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
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      return next(
        new ErrorHandler(`Product by id: ${req.params.id} not found`, 404)
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
 * /products
 *
 * @param {*} req request body
 * @param {*} res response body with the found products
 *
 */
const getAllProducts = CatchAsyncErrors(async (req: Request, res: Response) => {
  const products = await Product.find();

  return res.status(200).json({
    success: true,
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
        new ErrorHandler("Failed to create product. Please retry", 404)
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
        new ErrorHandler(`Product by id: ${req.params.id} not found`, 404)
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
        new ErrorHandler(`Product by id: ${req.params.id} not found`, 404)
      );
    }

    await product.remove();

    return res.status(200).json({
      success: true,
      message: `Product by id: ${req.params.id} deleted`,
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
