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
  one = "Electronics",
  two = "Cameras",
  three = "Laptop",
  four = "Accessories",
  five = "Headphones",
  six = "Foood",
  seven = "Books",
  eight = "Clothes/Shoes",
  nine = "Beauty/Health",
  ten = "Sports",
  eleven = "Outdoor",
  twelve = "Home",
}
