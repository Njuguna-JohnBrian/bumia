import * as express from "express";
import { ProductController } from "../controllers/product.controller";

const product: express.Router = express.Router();

const productBaseUrl = "/product";

product.get(`${productBaseUrl}/:id`, (req, res) => {
  ProductController.getSingleProduct(req, res);
});

export { product };
