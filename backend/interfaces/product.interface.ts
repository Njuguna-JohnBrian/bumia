export interface IProduct {
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: Array<IImages>;
  category: object;
  seller: string;
  stock: number;
  numOfReviews: number;
  reviews: Array<IReviews>;
  createdAt: Date;
}

interface IImages {
  public_id: object;
  url: object;
}

interface IReviews {
  name: string;
  rating: number;
  comment: string;
}

export enum EProducts {
  "Electronics",
  "Cameras",
  "Laptop",
  "Accessories",
  "Headphones",
  "Foood",
  "Books",
  "Clothes/Shoes",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
}
