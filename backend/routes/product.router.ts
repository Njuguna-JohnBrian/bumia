import * as express from "express";
import { ProductController } from "../controllers/product.controller";

const product: express.Router = express.Router();

const productBaseUrl = "/product";

const productsBaseUrl = "/products";

/**
 *Get single product
 */
product.get(`${productBaseUrl}/:id`, (req, res) => {
  ProductController.getSingleProduct(req, res);
});

/**
 * Get all products
 */
product.get(productsBaseUrl, (req, res) => {
  ProductController.getAllProducts(req, res);
});

/**
 * Create new product
 */
product.post(`${productBaseUrl}/new`, (req, res) => {
  ProductController.createProduct(req, res);
});

export { product };
