import { Response, Request } from "express";
import { Product } from "../models/product.model";

export class ProductController {
  /**Get Single Product
   *
   * /product/:`id`
   *
   * @param {*} req request body with `id` as parameter
   * @param {*} res response body with the found product
   *
   */
  static async getSingleProduct(
    req: Request,
    res: Response
  ): Promise<Response<object, Record<string, object>>> {
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
  }
}
