import { FC, Fragment, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { H2 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import { carouselStyled } from "components/carousel/styles";
import ProductCard18 from "components/product-cards/ProductCard18";
import Product from "models/Product.model";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/router";

// ======================================================================
type Section6Props = { products: Product[]; category: string };
// ======================================================================

const Section6: FC<Section6Props> = ({ products, category }) => {
  const width = useWindowSize();
  const router = useRouter();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const handlePush = () => {
    router.push(`/categorias/${category}`);
  };

  return (
    <Fragment>
      {/* FEATURED PRODUCTS AREA */}
      <Container sx={{ mt: 8, pb: 8 }}>
        {/* <H2 textAlign="center" mb={4}>
          Produtos em Destaque
        </H2> */}

        <Carousel
          totalSlides={products.length}
          visibleSlides={visibleSlides}
          sx={carouselStyled}
        >
          {products.map((product) => (
            <ProductCard18 key={product.ProductId} product={product} />
          ))}
        </Carousel>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handlePush} variant="outlined">
            Ver mais
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Section6;
