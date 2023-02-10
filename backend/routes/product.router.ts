import * as express from "express";
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
product.get(`${productBaseUrl}/:id`, (req, res) => {
  return getSingleProduct(req, res);
});

/**
 * Get all products
 */
product.get(productsBaseUrl, (req, res) => {
  return getAllProducts(req, res);
});

/**
 * Create new product
 */
product.post(`${productBaseUrl}/new`, (req, res) => {
  return createProduct(req, res);
});

/**
 * Update product
 */
product.put(`${productBaseUrl}/:id`, (req, res) => {
  return updateProduct(req, res);
});

/**
 * Delete product
 */
product.delete(`${productBaseUrl}/:id`, (req, res) => {
  return deleteProduct(req, res);
});

export { product };
