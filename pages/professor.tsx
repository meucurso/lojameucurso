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

const CursosOAB1Fase = (props) => {
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
          title="/Professor"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={props.indexBannersData} />

          <Box sx={{ backgroundColor: "#fff" }}>
            <Container>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item md={12} textAlign={"center"} marginTop={2}>
                  <h1>Sites Professores MeuCurso</h1>
                </Grid>
                <Grid item md={3} textAlign={"center"}>
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    width="150"
                    height="150"
                    src="https://www.meucurso.com.br/media/wysiwyg/Professoresformais/prof_Alessandro.Spilborghs.png"
                    alt="help--v1"
                  />
                  <h3>Alessandro Spilborghs</h3>
                  <p>
                    Tributário | Prática Tributária | Planejamento
                    Tributário
                  </p>
                </Grid>
                <Grid item md={3} textAlign={"center"}>
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    width="150"
                    height="150"
                    src="https://www.meucurso.com.br/media/wysiwyg/Professoresformais/prof_Carol.Macaubal.png"
                    alt="external-notepad-school-stationery-itim2101-lineal-itim2101"
                  />
                  <h3>Carol Macaubal</h3>
                  <p>Processo Civil | Prática Civil | Planos de Saúde.</p>
                </Grid>
                <Grid item md={3} textAlign={"center"}>
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    width="150"
                    height="150"
                    src="https://www.meucurso.com.br/media/wysiwyg/Professoresformais/prof_Conrado.Paulino.png"
                    alt="external-open-box-celebration-becris-lineal-becris"
                  />
                  <h3>Conrado Paulino</h3>
                  <p>Direito de Família | Sucessões | Prática Familista</p>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    width="150"
                    height="150"
                    src="https://www.meucurso.com.br/media/wysiwyg/Professoresformais/prof.Darlan_Barroso.png"
                    alt="wise-mind"
                  />
                  <h3>Darlan Barroso</h3>
                  <p>
                    Processo Civil | Prática Cívil | Iniciação na Advocacia
                    | Legal Design
                  </p>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} textAlign={"start"}>
              <h1>O que é o /Professor MeuCurso</h1>
              <p>
                O MeuCurso, criado para ser uma Plataforma ilimitada de
                conteúdo, criou tecnologia e organização para que cada
                Professor, em todo o Brasil, possa desenvolver seus cursos
                e disponibilizar para toda a base de alunos MeuCurso.
              </p>
              <p>
                A Plataforma proporciona ao professor total apoio, desde a
                idealização dos cursos, operação, venda e experiência do
                aluno.
              </p>
            </Grid>
            <Grid item md={6}>
              <h1>
                Quer fazer parte desse grande ecossistema de educação
                jurídica?
              </h1>
              <p>
                Nossa equipe pedagógica e de apoio aos professores terá
                grande satisfação em falar contigo.
              </p>
              <Button variant="contained" color="error">
                Chamar no Whatsapp
              </Button>
              <p>
                Nossa equipe entrará em contato para auxiliar com todas as
                informações e planos de parceria com o MeuCurso.
              </p>
            </Grid>
          </Grid>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default CursosOAB1Fase;

export const getStaticProps: GetStaticProps = async () => {
  const featureProducts = await api.getFeatureProducts();
  const indexBannersData = await api.getIndexBanners("11");
  return {
    props: {
      featureProducts,
      indexBannersData,
    },
    revalidate: 25,
  };
};
