import Shop from "./Shop.model";
import Review from "./Review.model";

interface Product {
  SKU?: any;
  ProductGroupId?: any;
  childrenProducts?: any;
  ProductChildren?: any;
  URLKey?: string;
  ProductId?: number;
  SmallImageUrl?: string;
  Name?: string;
  SpecialPrice?: number;
  Price?: number;
  ShortDescription?: string;
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
