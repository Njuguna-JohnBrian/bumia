import * as mongoose from "mongoose";
import {
  EProducts,
  IProduct,
  ProductModelErrors,
} from "../interfaces/product.interface";

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, ProductModelErrors.nameRequired],
    trim: true,
    maxlength: [100, ProductModelErrors.nameMaxlength],
  },
  price: {
    type: Number,
    required: [true, ProductModelErrors.priceRequired],
    maxlength: [5, ProductModelErrors.priceMaxlength],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, ProductModelErrors.descriptionRequired],
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
    required: [true, ProductModelErrors.categoryRequired],
    enum: {
      values: Object.values(EProducts),
      message: ProductModelErrors.categoryRequired,
    },
  },
  seller: {
    type: String,
    required: [true, ProductModelErrors.sellerRequired],
  },
  stock: {
    type: Number,
    required: [true, ProductModelErrors.stockRequired],
    maxlength: [5, ProductModelErrors.stockMaxlength],
    default: 0.0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

Product.createIndexes();

export { Product };
