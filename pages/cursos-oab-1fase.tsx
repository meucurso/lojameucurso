import ShopLayout1 from "components/layouts/ShopLayout1";
import { GetStaticProps } from "next";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import api from "utils/__api__/meu-curso";
import SEO from "components/SEO";
import ExclusiveTools from "components/exclusive-tools/ExclusiveTools";
import OABExamTeam from "components/oab-examteam/OABExamTeam";
import Section6 from "pages-sections/fashion-shop-2/Section6";
import ResponsiveBanners from "components/responsive-banners/ResponsiveBanners";
import axios from "axios";
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
          title="1ª Fase OAB"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Section1 carouselData={props.indexBannersData} />
          <Container>
            <Grid container spacing={2} marginTop={5}>
              <Grid item md={6}>
                <Box textAlign={{ xs: "center", lg: "start" }}>
                  <h1>Prova OAB: 1ª fase é no MeuCurso!</h1>
                  <p>
                    Aqui sua preparação é levada a sério! Faremos o nosso
                    melhor para te ajudar a conquistar o sonhado
                    #nomenalista. Desenvolvemos uma plataforma e
                    metodologia de estudos completa, inovadora, eficaz e
                    adaptada ao seu perfil de estudos. Tenha aula com os
                    melhores professores do mercado.
                  </p>
                  <p>
                    Conteúdo atualizado: no novo formato da prova com 20
                    disciplinas!
                  </p>
                </Box>
                <Box
                  textAlign={{
                    lg: "start",
                    xs: "center",
                  }}
                  my={2}
                >
                  <Button variant="contained" color="error">
                    QUERO COMERÇAR MEUS ESTUDOS!
                  </Button>
                </Box>
              </Grid>
              <Grid mx={"auto"} item lg={6}>
                <Box>
                  <iframe
                    style={{ aspectRatio: "16/9" }}
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/769157308?h=d1e68cde2b"
                    width="100%"
                    height="auto"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container>
              <Grid item md={12} textAlign={"center"}>
                <h1>Cursos da 1ª fase no MeuCurso</h1>
                <p>
                  Você estuda ou já se formou em Direito e possui o sonho
                  de atuar como advogado(a)?
                </p>
                <p>
                  Para conquistar esse desejo, é necessário ser aprovado no
                  Exame de Ordem. Estamos aqui para te ajudar a concretizar
                  esse sonho!
                </p>
              </Grid>
            </Grid>
          </Container>
          <h1 style={{ textAlign: "center" }}>Cursos 39º Exame</h1>
          <Section6 products={props.oab39Products} />
          <h1 style={{ textAlign: "center" }}>Cursos 40º Exame</h1>
          <Section6 products={props.oab40Products} />
          <Box sx={{ backgroundColor: "#fff" }}>
            <Container>
              <Grid container spacing={2} justifyContent={"center"}>
                <Grid item md={12} textAlign={"center"} marginTop={2}>
                  <h1>Por que sua 1ª fase do MeuCurso?</h1>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/D01212/help--v1.png"
                    alt="help--v1"
                  />
                  <h3>Questões para praticar</h3>
                  <p>
                    Em cada aula dos cursos, será selecionado questões para
                    praticar o tema estudado.
                  </p>
                  <p>
                    Tal processo faz parte da metodologia de estudo do
                    MeuCurso Saber + Praticar + Revisar + Aprofundar (em
                    cada aula).
                  </p>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/external-itim2101-lineal-itim2101/64/D01212/external-notepad-school-stationery-itim2101-lineal-itim2101.png"
                    alt="external-notepad-school-stationery-itim2101-lineal-itim2101"
                  />
                  <h3>Simulados com diagnóstico</h3>
                  <p>
                    Simular a prova no formato OAB/FGV e diagnóstico
                    personalizado com a performance de disciplina e tema,
                    com gráficos e plano de estudo.
                  </p>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/external-becris-lineal-becris/64/D01212/external-open-box-celebration-becris-lineal-becris.png"
                    alt="external-open-box-celebration-becris-lineal-becris"
                  />
                  <h3>Material extra</h3>
                  <ul>
                    <li>Plano de estudos (pdf)</li>
                    <li>Questões por tema</li>
                    <li>Planner(cronograma)</li>
                    <li>Sumário (todas as aulas são temáticas)</li>
                    <li>
                      Objetos de revisão (mapas mentais, podcasts, quiz,
                      tabelas e infográficos) para cada aula.
                    </li>
                  </ul>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/D01212/wise-mind.png"
                    alt="wise-mind"
                  />
                  <h3>Gestão das Emoções</h3>
                  <p>
                    Além do conteúdo, estamos preocupados com os aspectos
                    subjetivos que impactam no momento da prova e no
                    percurso da rota
                  </p>
                  <p>
                    Com o Prof. Marco Antonio, ao longo da rota, você
                    encontrará muitos eventos de gestão das emoções.
                  </p>
                </Grid>
                <Grid item md={2} textAlign={"center"}>
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/ios/50/D01212/calendar--v1.png"
                    alt="calendar--v1"
                  />
                  <h3>Maratona de eventos</h3>
                  <ul>
                    <li>Gabaritando Ética</li>
                    <li>Imersão OAB</li>
                    <li>Detona OAB</li>
                    <li>Desafio Interdisciplinar</li>
                    <li>Café da Manhã com Ética</li>
                  </ul>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <ExclusiveTools />
          <Box sx={{ backgroundColor: "#fff" }}>
            <OABExamTeam />
          </Box>
        </Container>
      </ShopLayout1>
    </>
  );
};
export default CursosOAB1Fase;

export const getStaticProps: GetStaticProps = async () => {
  const oab39Products = await api.getProductsById("128");
  const oab40Products = await api.getProductsById("129");
  const indexBannersData = await api.getIndexBanners("5");
  return {
    props: {
      oab39Products,
      oab40Products,
      indexBannersData,
    },
    revalidate: 25,
  };
};
