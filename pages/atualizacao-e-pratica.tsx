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

const AtualizacaoEPratica = (props) => {
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
          title="Atualização e Prática"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={props.updatePracticceBanners} />
          <Box
            py={5}
            my={5}
            sx={{
              backgroundImage:
                "url(https://www.meucurso.com.br/media/wysiwyg/bg_home_extensoes_3.jpg)",
              color: "#fff",
            }}
          >
            <Container>
              <Grid container>
                <Grid item md={12} textAlign={"center"}>
                  <H1>Cursos em Destaque</H1>
                </Grid>
              </Grid>
              <Section6 products={props.featureProducts} />
            </Container>
          </Box>
          <Box sx={{ backgroundColor: "#fff" }}></Box>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default AtualizacaoEPratica;

export const getStaticProps: GetStaticProps = async () => {
  const featureProducts = await api.getFeatureProducts();
  const constestCarousel = await api.getContestCarousel();
  const updatePracticceBanners = await api.getUpdatePracticeBanner();

  return {
    props: {
      featureProducts,
      constestCarousel,
      updatePracticceBanners,
    },
  };
};
