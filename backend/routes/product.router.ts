import * as express from "express";
import { ProductController } from "../controllers/product.controller";

const product: express.Router = express.Router();

const productBaseUrl = "/product";

const productsBaseUrl = "/products";

/**
 *Get single product
 */
product.get(`${productBaseUrl}/:id`, (req, res) => {
  return ProductController.getSingleProduct(req, res);
});

/**
 * Get all products
 */
product.get(productsBaseUrl, (req, res) => {
  return ProductController.getAllProducts(req, res);
});

/**
 * Create new product
 */
product.post(`${productBaseUrl}/new`, (req, res) => {
  return ProductController.createProduct(req, res);
});

/**
 * Update product
 */
product.put(`${productBaseUrl}/:id`, (req, res) => {
  return ProductController.updateProduct(req, res);
});

/**
 * Delete product
 */
product.delete(`${productBaseUrl}/:id`, (req, res) => {
  return ProductController.deleteProduct(req, res);
});

export { product };
