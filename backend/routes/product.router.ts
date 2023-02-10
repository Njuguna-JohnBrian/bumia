import express, { Request, Response, NextFunction } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller";

const product: express.Router = express.Router();

const productBaseUrl = "/product";

const productsBaseUrl = "/products";

/**
 *Get single product
 */
product.get(
  `${productBaseUrl}/:id`,
  (req: Request, res: Response, next: NextFunction) => {
    return getSingleProduct(req, res, next);
  }
);

/**
 * Get all products
 */
product.get(
  productsBaseUrl,
  (req: Request, res: Response, next: NextFunction) => {
    return getAllProducts(req, res, next);
  }
);

/**
 * Create new product
 */
product.post(
  `${productBaseUrl}/new`,
  (req: Request, res: Response, next: NextFunction) => {
    return createProduct(req, res, next);
  }
);

/**
 * Update product
 */
product.put(
  `${productBaseUrl}/:id`,
  (req: Request, res: Response, next: NextFunction) => {
    return updateProduct(req, res, next);
  }
);

/**
 * Delete product
 */
product.delete(
  `${productBaseUrl}/:id`,
  (req: Request, res: Response, next: NextFunction) => {
    return deleteProduct(req, res, next);
  }
);

export { product };
