interface Category {
  id: string;
  name: string;
  url?: string;
  slug: string;
  icon?: string;
  image?: string;
  parent: string[];
  featured?: boolean;
  description?: string;
}

export default Category;
