import * as dotenv from "dotenv";
import * as path from "path";

import { data } from "../data/products.data";
import { connectDatabase } from "../config/database";
import { Product } from "../models/product.model";

dotenv.config({
  path: path.join(__dirname, "../../../backend/config/config.env"),
});

connectDatabase();

const seedProducts = async (): Promise<void> => {
  try {
    await Product.deleteMany();

    console.log("All products deleted from database...");

    await Product.insertMany(data);

    console.log("All products added to database...");

    process.exit();
  } catch (error) {
    console.log(error.message);

    process.exit();
  }
};

seedProducts();
