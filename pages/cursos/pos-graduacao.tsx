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
import Section1 from "pages-sections/fashion-shop-2/Section1";
import { H1, Paragraph } from "components/Typography";
import TenMotives from "components/tenmotives-postgraduate/TenMotives";
import { useProducts } from "hooks/useProducts";
import { useBanners } from "hooks/useBanners";

const PosGraduacao = () => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  const { products } = useProducts(api.getProductsById("3"));

  const { banners } = useBanners(api.getIndexBanners("9"));

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
          title="Cursos de Pós-Graduação em Direito confira"
          sitename="MeuCurso"
          description="Aprofunde seus conhecimentos na área jurídica com nossos cursos de pós-graduação em Direito. Prepare-se para se destacar na sua carreira!"
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={banners} />
          <Container>
            <Grid container spacing={2} marginTop={5}>
              <Grid item md={6}>
                <Box textAlign={{ xs: "center", lg: "start" }}>
                  <h1>Qual a importância de um curso de pós-graduação?</h1>
                  <p>
                    Estudar de forma aprofundada a área que você escolheu
                    atuar, aprender com os maiores juristas do país, ter
                    uma visão teórica e prática dentro dos temas da área,
                    desenvolver raciocínio crítico, entre outras vantagens.
                  </p>
                  <p>
                    Conheça nossos 10 cursos de pós e os 10 motivos para
                    você se reinventar para o mercado de trabalho!
                  </p>
                </Box>
                <Box
                  textAlign={{
                    lg: "start",
                    xs: "center",
                  }}
                  my={2}
                >
                  <Button variant="contained">
                    QUERO COMERÇAR MEUS ESTUDOS!
                  </Button>
                </Box>
              </Grid>
              <Grid mx={"auto"} item lg={6}>
                <Box>
                  <iframe
                    style={{ aspectRatio: "16/9" }}
                    title="vimeo-player"
                    src="https://www.youtube.com/embed/8Bt2VvhbRDA?si=ph0dpAVAOcmgdgDN"
                    width="100%"
                    height="auto"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ backgroundColor: "#fff" }}>
            <Container sx={{ marginTop: 5 }}>
              <Grid container>
                <Grid item md={12} textAlign={"center"}>
                  <h1>Cursos em Destaque</h1>
                </Grid>
              </Grid>
              <Section6 category="pos-graduacao" products={products} />
            </Container>
          </Box>
          <TenMotives />
        </Container>
      </ShopLayout1>
    </>
  );
};
export default PosGraduacao;
