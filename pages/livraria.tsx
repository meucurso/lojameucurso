import ShopLayout1 from "components/layouts/ShopLayout1";
import { GetStaticProps } from "next";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import api from "utils/__api__/meu-curso";
import SEO from "components/SEO";
import Section6 from "pages-sections/fashion-shop-2/Section6";
import { H1 } from "components/Typography";

import Section1 from "pages-sections/fashion-shop-2/Section1";

const Livraria = (props) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);
  const theme = useTheme();

  return (
    <>
      <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
        <SEO
          title="Livraria"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={props.indexBannersData} />
          <Box
            py={5}
            my={5}
            sx={{
              color: "black",
            }}
          >
            <Container>
              <Grid container>
                <Grid item md={12} textAlign={"center"}>
                  <H1>Livros em Destaque</H1>
                </Grid>
              </Grid>
              <Section6 products={props.booksProducts} />
            </Container>
          </Box>
          <Box sx={{ backgroundColor: "#fff" }}></Box>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default Livraria;

export const getStaticProps: GetStaticProps = async () => {
  const booksProducts = await api.getProductsById("13");
  const indexBannersData = await api.getIndexBanners("12");

  return {
    props: {
      booksProducts,
      indexBannersData,
    },
  };
};
