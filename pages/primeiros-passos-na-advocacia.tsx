import ShopLayout1 from "components/layouts/ShopLayout1";
import { GetStaticProps, NextPage } from "next";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import api from "utils/__api__/meu-curso";
import SEO from "components/SEO";
import ExclusiveTools from "components/exclusive-tools/ExclusiveTools";
import OABExamTeam from "components/oab-examteam/OABExamTeam";
import Section6 from "pages-sections/fashion-shop-2/Section6";
import BazaarImage from "components/BazaarImage";
import ResponsiveBanners from "components/responsive-banners/ResponsiveBanners";

const PrimeirosPassosNaAdvocacia = (props) => {
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
          title="Primeiros Passos"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <ResponsiveBanners bannerData={props.firstStepsBanner} />
          <Container>
            <Grid container spacing={2} marginTop={5}>
              <Grid item md={6}>
                <Box
                  mt={{ lg: 10 }}
                  textAlign={{ xs: "center", lg: "start" }}
                >
                  {/* <h1>Prova OAB: 1ª fase é no MeuCurso!</h1> */}
                  <p>
                    Sabemos que o início da Advocacia impõe muitos desafios
                    e empreendedorismo.
                  </p>
                  <p>
                    Assim, gostaríamos de estar com vocês nessa fase com
                    apoio, conteúdos especiais, rede de relacionamento...
                  </p>
                  <p>
                    Aqui você encontra uma série de workshops temáticos
                    para turbinar a sua advocacia.
                  </p>
                </Box>
                <Box
                  textAlign={{
                    lg: "start",
                    xs: "center",
                  }}
                  my={2}
                >
                  {/* <Button variant="contained" color="error">
                    QUERO COMERÇAR MEUS ESTUDOS!
                  </Button> */}
                </Box>
              </Grid>
              <Grid mx={"auto"} item lg={6}>
                <Box>
                  <iframe
                    style={{ aspectRatio: "16/9" }}
                    title="vimeo-player"
                    src="https://www.youtube.com/embed/RZBlL_PAp4c?si=AHeJNHBqQHaWaMGo"
                    width="100%"
                    height="auto"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container>
              <Grid item md={12} textAlign={"center"}></Grid>
            </Grid>
            <Section6 products={props.featureProducts} />
          </Container>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default PrimeirosPassosNaAdvocacia;

export const getStaticProps: GetStaticProps = async () => {
  const featureProducts = await api.getFeatureProducts();
  const firstStepsBanner = await api.getFirstStepsBanner();
  return {
    props: {
      featureProducts,
      firstStepsBanner,
    },
    revalidate: 25,
  };
};
