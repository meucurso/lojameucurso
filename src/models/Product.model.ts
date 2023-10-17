import Shop from "./Shop.model";
import Review from "./Review.model";

interface Product {
  InStock: boolean;
  DescriptionFileUrl?: any;
  SKU?: any;
  ProductGroupId?: any;
  Selected?: boolean;
  childrenProducts?: any;
  Children?: any;
  URLKey?: string;
  ProductId?: number;
  SmallImageUrl?: string;
  Name?: string;
  SpecialPrice?: number;
  Price?: number;
  ShortDescription?: string | null;
  description?: string;
  shortDescription?: string;
  slug?: string;
  price?: number;
  title?: string;
  rating?: number;
  discount?: number;
  thumbnail?: string;
  id?: string;
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: string[];
  categories?: any[];
  reviews?: Review[];
  published?: boolean;
}

export default Product;
