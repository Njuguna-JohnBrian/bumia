import { Schema, model } from "mongoose";
import { EProducts, IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please select the category for this product"],
    enum: Object.values(EProducts),
  },
});

const Product = model<IProduct>("Product", productSchema);

Product.createIndexes();

export { Product };
