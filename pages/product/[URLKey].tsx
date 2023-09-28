import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import ProductDescription from "pages-sections/product-details/ProductDescription";
import Product from "models/Product.model";
import SEO from "components/SEO";
import api from "../../src/utils/__api__/meu-curso";

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

type ProductDetailsProps = {
  singleProduct: Product;
};

const updateChildrenSelected = (item) => {
  const updatedItem = { ...item };

  const updateChildren = (itemToUpdate) => {
    if (itemToUpdate.Children && itemToUpdate?.Children?.length > 0) {
      itemToUpdate.Children.forEach((child) => {
        if (
          child.ProductGroupId === 1 &&
          itemToUpdate.ProductGroupId === 3
        ) {
          child.Selected = false;
          itemToUpdate.Selected = false;
        } else {
          child.Selected = true;
        }
        updateChildren(child);
      });
    }
  };

  updateChildren(updatedItem);

  return updatedItem;
};

const ProductDetails: FC<ProductDetailsProps> = ({ singleProduct }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, value: number) => setSelectedOption(value);

  const [updatedProduct, setUpdatedProduct] = useState(singleProduct);

  useEffect(() => {
    if (singleProduct) {
      const updatedProduct = updateChildrenSelected(singleProduct);
      setUpdatedProduct(updatedProduct);
    }
  }, [singleProduct]);

  if (router.isFallback || !updatedProduct) {
    return <h1>Carregando...</h1>;
  }

  return (
    <ShopLayout1>
      <SEO
        title={updatedProduct.Name}
        sitename="MeuCurso - Do seu jeito. No seu tempo."
      />
      <Container sx={{ my: 4 }}>
        {/* PRODUCT DETAILS INFO AREA */}
        <ProductIntro singleProduct={updatedProduct} />

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Descrição" />
          {/* <Tab className="inner-tab" label="Review (3)" /> */}
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && (
            <ProductDescription product={updatedProduct} />
          )}
          {/* {selectedOption === 1 && <ProductReview />} */}
        </Box>
      </Container>
    </ShopLayout1>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const singleProduct = await api.getProductBySlug(params.URLKey);

  const updatedProduct = updateChildrenSelected(singleProduct);

  return {
    props: {
      singleProduct: updatedProduct,
    },
    revalidate: 25,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await api.getProducts();

  const paths = products.map((product: any) => ({
    params: { URLKey: String(product.URLKey) },
  }));

  return {
    paths,
    fallback: false,
  };
};
export default ProductDetails;
