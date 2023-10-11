import dotenv from "dotenv";
import * as path from "path";

import { testProducts, adminUser } from "../data/products.data";
import { connectDatabase } from "../config/database";
import { Product } from "../models/product.model";
import { User } from "../models/users.model";

dotenv.config({
  path: path.join(__dirname, "../../../backend/config/config.env"),
});

connectDatabase();

const seedProducts = async (): Promise<void> => {
  try {
    await Product.deleteMany();

    console.log("All products deleted from database...");

    await Product.insertMany(testProducts);

    console.log("All products added to database...");

    process.exit();
  } catch (error) {
    console.log(error.message);

    process.exit();
  }
};

const seedAdminUser = async (): Promise<void> => {
  try {
    await User.deleteMany();

    console.log("All users deleted from database...");

    await User.insertMany(adminUser);

    console.log("All users added to database...");

    process.exit();
  } catch (error) {
    console.log(error.message);

    process.exit();
  }
};

seedAdminUser();
seedProducts();
