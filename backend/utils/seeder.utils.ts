import { adminUser, testProducts } from "../data/seed.data";
import { Product } from "../models/product.model";
import { User } from "../models/users.model";

const seedProducts = async (): Promise<void> => {
  await Product.deleteMany();
  console.log("All products deleted from database...");
  await Product.insertMany(testProducts);
  console.log("All products added to database...");
};

const seedAdminUser = async (): Promise<void> => {
  await User.deleteMany();
  console.log("All users deleted from database...");
  await User.insertMany(adminUser);
  console.log("All users added to database...");
};


export {seedAdminUser, seedProducts}