import axios from "axios";
import Blog from "models/Blog.model";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Category from "models/Category.model";
import Banner from "models/Banners";

const getToken = async () => {
  const response = await axios.post(
    "https://apiecommerce.meucurso.com.br/api/login",
    {
      Email: "lucas.martins@meucurso.com.br",
      Password: "M3ucUrc0@5yEAp1",
    }
  );
  return response.data.Token;
};

const getProducts = async (): Promise<Product[]> => {
  const token = await getToken();
  const response = await axios.get(
    "https://apiecommerce.meucurso.com.br/Products/List",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getProductBySlug = async (URLKey: any) => {
  const token = await getToken();
  const response = await axios.get(
    `https://apiecommerce.meucurso.com.br/Products/Id?URLKey=${URLKey}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
const getProductsById = async (categoryId: string) => {
  const token = await getToken();
  const response = await axios.get(
    `https://apiecommerce.meucurso.com.br/Products/List?CategoryId=${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getFeatureProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=feature"
  );
  return response.data;
};

const getSaleProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=sale"
  );
  return response.data;
};

const getPopularProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=popular"
  );
  return response.data;
};

const getLatestProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=latest"
  );
  return response.data;
};

const getBestWeekProducts = async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=best-week"
  );
  return response.data;
};

const getBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get("/api/fashion-shop-2/blogs");
  return response.data;
};

const getServices = async (): Promise<Service[]> => {
  const response = await axios.get("/api/fashion-shop-2/service");
  return response.data;
};

const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/fashion-shop-2/category");
  return response.data;
};

const getIndexBanners = async (): Promise<Banner[]> => {
  const token = await getToken();
  const response = await axios.get(
    "https://apiecommerce.meucurso.com.br/Banners/List?bannerCategoryId=1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/fashion-shop-2/brands");
  return response.data;
};

const getContestCarousel = async () => {
  const response = await axios.get("/api/fashion-shop-2/contest-carousel");
  return response.data;
};
const getOAB2Banner = async () => {
  const response = await axios.get("/api/fashion-shop-2/oab2-banner");
  return response.data;
};
const getOAB1Banner = async () => {
  const response = await axios.get("/api/fashion-shop-2/oab1-banner");
  return response.data;
};
const getPostGraduateBanner = async () => {
  const response = await axios.get(
    "/api/fashion-shop-2/postagraduate-banner"
  );
  return response.data;
};
const getUpdatePracticeBanner = async () => {
  const response = await axios.get(
    "/api/fashion-shop-2/updatepractice-banner"
  );
  return response.data;
};
const getFirstStepsBanner = async () => {
  const response = await axios.get(
    "/api/fashion-shop-2/firststeps-banner"
  );
  return response.data;
};

export default {
  getBlogs,
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getSaleProducts,
  getLatestProducts,
  getPopularProducts,
  getFeatureProducts,
  getBestWeekProducts,
  getContestCarousel,
  getOAB2Banner,
  getOAB1Banner,
  getPostGraduateBanner,
  getUpdatePracticeBanner,
  getFirstStepsBanner,
  getIndexBanners,
  getProductBySlug,
  getProductsById,
};
