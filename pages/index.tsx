import { GetStaticProps, NextPage } from "next";
import { Box, useTheme } from "@mui/material";
import SEO from "components/SEO";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/fashion-shop-2/Section1";
import Section2 from "pages-sections/fashion-shop-2/Section2";
import Section3 from "pages-sections/fashion-shop-2/Section3";
import Section4 from "pages-sections/fashion-shop-2/Section4";

import Blog from "models/Blog.model";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import Category from "models/Category.model";
import api from "utils/__api__/meu-curso";

// =======================================================
type IndexPageProps = {
  blogs: Blog[];
  brands: Brand[];
  products: Product[];
  categories: Category[];
  serviceList: Service[];
  saleProducts: Product[];
  latestProducts: Product[];
  featureProducts: Product[];
  popularProducts: Product[];
  bestWeekProducts: Product[];
  indexBannersData: any;
};
// =======================================================

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO
        description="Cursos para o Exame da OAB, Carreiras Jurídicas, Carreiras Públicas, Pós Graduação Jurídica certificada pelo MEC, Cursos de Extensão Profissional. Cursos Online e Presenciais em São Paulo"
        sitename="MeuCurso - Do seu jeito.  No seu tempo."
        title="Início"
      />
      <Box bgcolor="white">
        {/* HERO SECTION CAROUSEL */}

        <Section1 carouselData={props.indexBannersData} />

        {/* SERVICE CARDS */}
        <Section2 serviceList={props.serviceList} />

        {/* BEST SELLING CATEGORIES */}
        <Section3 categories={props.categories} />

        {/* BEST SELLING PRODUCTS */}
        <Section4 products={props.products} />

        {/* OFFER BANNERS */}
        {/* <Section5 /> */}

        {/* FEATURED PRODUCTS */}
        {/* <Section6 products={props.featureProducts} /> */}

        {/* SUMMER SALE OFFER AREA */}
        {/* <Section7 /> */}

        {/* BLOG LIST AREA */}
        {/* <Section8 blogs={props.blogs} /> */}

        {/* BRAND LIST CAROUSEL AREA */}
        {/* <Section9 brands={props.brands} /> */}

        {/* PRODUCT LIST COLUMN */}
        {/* <Section10
          saleProducts={props.saleProducts}
          latestProducts={props.latestProducts}
          popularProducts={props.popularProducts}
          bestWeekProducts={props.bestWeekProducts}
        /> */}
      </Box>

      {/* POPUP NEWSLETTER FORM */}
      {/* <Newsletter /> */}

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      {/* <Setting /> */}
    </ShopLayout1>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await api.getBlogs();
  const brands = await api.getBrands();
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const categories = await api.getCategories();
  const saleProducts = await api.getSaleProducts();
  const latestProducts = await api.getLatestProducts();
  const popularProducts = await api.getPopularProducts();
  const featureProducts = await api.getFeatureProducts();
  const bestWeekProducts = await api.getBestWeekProducts();
  const indexBannersData = await api.getIndexBanners("1");

  return {
    props: {
      blogs,
      brands,
      products,
      categories,
      serviceList,
      saleProducts,
      latestProducts,
      popularProducts,
      featureProducts,
      bestWeekProducts,
      indexBannersData,
    },
    revalidate: 25,
  };
};

export default IndexPage;
