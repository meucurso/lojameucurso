import api from "../../src/utils/__api__/meu-curso";
import ShopLayout1 from "components/layouts/ShopLayout1";
import { Box, Card, Container, Grid, useTheme } from "@mui/material";
import SEO from "components/SEO";
import { H5, Paragraph } from "components/Typography";
import ProductCard1 from "components/product-cards/ProductCard1";
import ResponsiveBanners from "components/responsive-banners/ResponsiveBanners";

export const getStaticPaths = async () => {
  const categories = await api.getProductsCategories();

  const generatePaths = (category, parentPath = "") => {
    const currentPath = parentPath ? category.UrlKey : category.UrlKey;

    if (category.children && category.children.length > 0) {
      const childPaths = category.children.reduce((acc, childCategory) => {
        return acc.concat(generatePaths(childCategory, currentPath));
      }, []);
      return [currentPath, ...childPaths];
    }

    return [currentPath];
  };

  const paths = categories.reduce((acc, category) => {
    return acc.concat(generatePaths(category));
  }, []);

  return {
    paths: paths.map((path) => ({ params: { UrlKey: path } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const categories = await api.getProductsCategoriesByUrlKey(
    params.UrlKey
  );

  const categoryId = categories.map((category) => category.id);
  const categoryName = categories.map((category) => category.text);
  const categoryBanner = categories.map(
    (category) => category.BannerFileUrl
  );

  const products = await api.getProductsById(categoryId);

  return {
    props: {
      categoryName,
      categoryBanner,
      products,
    },
    revalidate: 1,
  };
};

const Categories = ({ categoryName, products, categoryBanner }) => {
  const theme = useTheme();

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
      <SEO
        title={categoryName}
        sitename="MeuCurso - Do seu jeito.  No seu tempo."
      />
      <Container disableGutters={true} maxWidth="xl">
        <ResponsiveBanners bannerData={categoryBanner} />
        <Container sx={{ mt: 4 }}>
          <Card
            elevation={1}
            sx={{
              mb: "55px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              p: {
                sm: "1rem 1.25rem",
                md: "0.5rem 1.25rem",
                xs: "1.25rem 1.25rem 0.25rem",
              },
            }}
          >
            <Box>
              <H5>{categoryName}</H5>
              <Paragraph color="grey.600">
                {products.length} resultados encontrados
              </Paragraph>
            </Box>
          </Card>
          {/* PRODUCT LIST AREA */}

          <Grid container spacing={3} minHeight={500}>
            {products.map((item) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={item.ProductId}>
                <ProductCard1
                  title={item.Name}
                  SpecialPrice={item.SpecialPrice}
                  price={item.Price}
                  imgUrl={item.SmallImageUrl}
                  URLKey={item.URLKey}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </ShopLayout1>
  );
};

export default Categories;
