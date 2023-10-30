import ShopLayout1 from "components/layouts/ShopLayout1";
import { GetStaticProps } from "next";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import api from "utils/__api__/meu-curso";
import SEO from "components/SEO";
import Section6 from "pages-sections/fashion-shop-2/Section6";
import { H1, H2 } from "components/Typography";

import Section1 from "pages-sections/fashion-shop-2/Section1";
import { useProducts } from "hooks/useProducts";
import { useBanners } from "hooks/useBanners";

const Livraria = () => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  const { products } = useProducts(api.getProductsById("13"));
  const { products: livrariaOAB } = useProducts(
    api.getProductsById("148")
  );
  const { products: livrariaConcursos } = useProducts(
    api.getProductsById("151")
  );

  const { banners } = useBanners(api.getIndexBanners("12"));

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
          title="Cursos de Direito: Livros Didáticos Educação Jurídica"
          sitename="MeuCurso"
          description="Descubra nossa livraria jurídica, onde você pode adquirir os livros necessários para seus cursos de Direito. Amplie seu conhecimento com a literatura!"
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={banners} />
          <Box
            py={5}
            my={5}
            sx={{
              color: "black",
            }}
          >
            <Container>
              <H1 textAlign={"center"}>Livros em Destaque</H1>

              <Section6 category="Livraria" products={products} />
              <H2 textAlign={"center"}>Livraria OAB</H2>
              <Section6
                category="livraria-livraria-oab"
                products={livrariaOAB}
              />
              <H2 textAlign={"center"}>Livaria Concursos</H2>
              <Section6
                category="livraria-concursos"
                products={livrariaConcursos}
              />
            </Container>
          </Box>
          <Box sx={{ backgroundColor: "#fff" }}></Box>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default Livraria;
