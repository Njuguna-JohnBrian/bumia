import { Response, Request } from "express";
import { Product } from "../models/product.model";
import { CatchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware";

/**Get Single Product
 *
 * /product/:`id`
 *
 * @param {*} req request body with `id` as parameter
 * @param {*} res response body with the found product
 *
 */
const getSingleProduct = CatchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product by id: ${req.params.id} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
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
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**Create Product
 *
 * /product/new
 *
 * @param {*} req request body with product details
 * @param {*} res response body with the new product
 *
 */
const createProduct = CatchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**Update Product
 *
 * /product/:id
 *
 * @param {*} req request body with new product details
 * @param {*} res response body with the new product
 *
 */
const updateProduct = CatchAsyncErrors(async (req: Request, res: Response) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product by id: ${req.params.id} not found`,
      });
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**Delete Product
 *
 * /product/:id
 *
 * @param {*} req request body with product to delete
 * @param {*} res response body with delete message
 *
 */
const deleteProduct = CatchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product by id: ${req.params.id} not found`,
      });
    }

    await product.remove();

    return res.status(200).json({
      success: true,
      message: `Product by id: ${req.params.id} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
