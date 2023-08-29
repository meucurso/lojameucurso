import ShopLayout1 from "components/layouts/ShopLayout1";

import { Box, Grid, useTheme } from "@mui/material";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";

import SEO from "components/SEO";
import { H2, H3, Paragraph } from "components/Typography";

const Embaixadores = (props) => {
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
          title="Embaixadores / Consultores"
          sitename="MeuCurso - Do seu jeito.  No seu tempo."
        />
        <Container maxWidth="xl" disableGutters={true}>
          <Container>
            <Grid container spacing={5} marginTop={0}>
              <Grid item md={9}>
                <Box textAlign={{ xs: "center", lg: "start" }}>
                  <h1 style={{ color: "#D01212" }}>
                    Embaixadores / Consultores
                  </h1>
                  <Paragraph textAlign={"justify"} my={3}>
                    Precisando de um suporte para entender um pouco mais sobre
                    os nossos cursos? Alguém que represente o MeuCurso em sua
                    cidade e esteja preparado para lhe ajudar na sua rota de
                    sucesso? Ou quem sabe aquele “cupom” de desconto especial?
                  </Paragraph>
                  <Paragraph textAlign={"justify"} my={3}>
                    Aqui temos os Embaixadores MeuCurso, que fazem parte do
                    nosso time representando a nossa missão e valor em cada
                    região desse País e estão preparados para dar suporte em
                    toda a sua rota de estudo.
                  </Paragraph>
                  <Paragraph textAlign={"justify"} my={3}>
                    Localize o Embaixador na sua cidade na lista abaixo, entre
                    em contato por meio dos canais disponibilizados (whatsApp e
                    redes sociais do embaixador), tire suas dúvidas, receba o
                    cupom de desconto especial, finalize a sua matricula em
                    nosso site e pronto!
                  </Paragraph>
                </Box>
              </Grid>
              <Grid item md={3} display={"flex"} alignItems={"center"}>
                <img
                  src="assets/images/Bipe/brasil_bipe.webp"
                  alt="icone do bipe brasileiro"
                />
              </Grid>
            </Grid>
          </Container>
          <Box sx={{ backgroundColor: "#fff" }}>
            <Container>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-glyph-andi-nur-abdillah/64/D01212/external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah.png"
                  alt="external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah"
                />
                <H2 ml={3}>Região Norte</H2>
              </Box>
              <Grid
                py={5}
                my={5}
                container
                spacing={2}
                justifyContent={"center"}
              >
                {ambassador
                  .filter((item) => item.regionId === 1)
                  .map((item, index) => (
                    <Grid key={index} item md={4} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        <a href={item.url}>{item.instagram}</a>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-glyph-andi-nur-abdillah/64/D01212/external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah.png"
                  alt="external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah"
                />
                <H2 ml={3}>Região Nordeste</H2>
              </Box>
              <Grid
                py={5}
                my={5}
                container
                spacing={2}
                justifyContent={"center"}
              >
                {ambassador
                  .filter((item) => item.regionId === 2)
                  .map((item, index) => (
                    <Grid key={index} item md={4} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        <a href={item.url}>{item.instagram}</a>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-glyph-andi-nur-abdillah/64/D01212/external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah.png"
                  alt="external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah"
                />
                <H2 ml={3}>Região Centro-Oeste</H2>
              </Box>
              <Grid py={5} my={5} container spacing={2}>
                {ambassador
                  .filter((item) => item.regionId === 3)
                  .map((item, index) => (
                    <Grid key={index} item md={4} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        <a href={item.url}>{item.instagram}</a>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-glyph-andi-nur-abdillah/64/D01212/external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah.png"
                  alt="external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah"
                />
                <H2 ml={3}>Região Sudeste</H2>
              </Box>
              <Grid py={5} my={5} container spacing={2}>
                {ambassador
                  .filter((item) => item.regionId === 4)
                  .map((item, index) => (
                    <Grid key={index} item md={4} my={2} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        <a href={item.url}>{item.instagram}</a>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/external-glyph-andi-nur-abdillah/64/D01212/external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah.png"
                  alt="external-Brazil-brazil-carnival-(glyph)-glyph-andi-nur-abdillah"
                />
                <H2 ml={3}>Região Sul</H2>
              </Box>
              <Grid
                py={5}
                my={5}
                container
                spacing={2}
                justifyContent={"center"}
              >
                {ambassador
                  .filter((item) => item.regionId === 5)
                  .map((item, index) => (
                    <Grid key={index} item md={4} my={2} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p
                        style={{
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        <a href={item.url}>{item.instagram}</a>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
              <Box display={"flex"} alignItems={"center"} py={2}>
                <img
                  width="64"
                  height="64"
                  src="https://img.icons8.com/pastel-glyph/64/D01212/talk--v3.png"
                  alt="talk--v3"
                />
                <H2 ml={3}>Consultores</H2>
              </Box>
              <Grid py={5} my={5} container spacing={2}>
                {ambassador
                  .filter((item) => item.regionId === 6)
                  .map((item, index) => (
                    <Grid key={index} item md={4} my={2} textAlign={"center"}>
                      <img
                        loading="lazy"
                        width="150"
                        height="150"
                        src={item.img}
                        alt="new-post"
                      />
                      <H3 sx={{ color: "#D01212" }}>{item.city}</H3>
                      <p>
                        <strong>{item.instagram}</strong>
                      </p>
                      <strong>{item.phone}</strong>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </Box>
        </Container>
      </ShopLayout1>
    </>
  );
};

const ambassador = [
  {
    regionId: 1,
    img: "assets/images/Embaixadores e Consultores/Norte/1.webp",
    city: "PALMAS | TO",
    url: "https://instagram.com/emb.meucurso.palmas?utm_medium=copy_link",
    instagram: "@emb.meucurso.palmas",
    phone: "63 98404-4020",
  },
  {
    regionId: 1,
    img: "assets/images/Embaixadores e Consultores/Norte/2.webp",
    city: "SANTARÉM | PA",
    url: "https://www.instagram.com/emb.meucurso.santarem/",
    instagram: "@emb.meucurso.santarem",
    phone: "93 99180-9483",
  },
  {
    regionId: 1,
    img: "assets/images/Embaixadores e Consultores/Norte/3.webp",
    city: "BELÉM | PA",
    url: "https://www.instagram.com/renilda4879",
    instagram: "@renilda4879",
    phone: "91 9150-9259",
  },
  {
    regionId: 2,
    img: "assets/images/Embaixadores e Consultores/Nordeste/1.webp",
    city: "PATOS | PB",
    url: "https://www.instagram.com/embaixadormeucursopatos/",
    instagram: "@embaixadormeucursopatos",
    phone: "83 98162-4747",
  },
  {
    regionId: 2,
    img: "assets/images/Embaixadores e Consultores/Nordeste/2.webp",
    city: "FEIRA DE SANTANA | BA",
    url: "https://www.instagram.com/meucursofeiradesantana/?next=%2F",
    instagram: "@meucursofeiradesantana",
    phone: "75 98237-8407",
  },
  {
    regionId: 2,
    img: "assets/images/Embaixadores e Consultores/Nordeste/2.webp",
    city: "SALVADOR | BA",
    url: "https://www.instagram.com/meucursosalvador",
    instagram: "@meucursosalvador",
    phone: "75 98237-8407",
  },
  {
    regionId: 3,
    img: "assets/images/Embaixadores e Consultores/Centro-Oeste/1.webp",
    city: "GOIÂNIA | GO",
    url: "https://www.instagram.com/accounts/login/?next=/emb.meucurso.goiania/",
    instagram: "@emb.meucurso.goiania",
    phone: "62 93945-1777",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/1.webp",
    city: "BAURU | SP",
    url: "https://www.instagram.com/emb.meucurso.bauru/?next=%2F",
    instagram: "@emb.meucurso.bauru",
    phone: "14 99811-0403",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/2.webp",
    city: "JANDIRA | SP",
    url: "https://instagram.com/barbiedodireito?utm_medium=copy_link",
    instagram: "@barbiedodireito",
    phone: "11 97389-5057",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/3.webp",
    city: "MOGI DAS CRUZES | SP",
    url: "https://instagram.com/meucursomogidascruzes?utm_medium=copy_link",
    instagram: "@meucursomogidascruzes",
    phone: "11 97280-5432",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/4.webp",
    city: "MONTES CLAROS | MG",
    url: "https://www.instagram.com/emb.meucurso.montesclaros",
    instagram: "@emb.meucurso.montesclaros",
    phone: "38 99894-4321",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/5.webp",
    city: "SÃO BERNARDO DO CAMPO | SP",
    url: "https://www.instagram.com/emb.meucurso.saobernardo/",
    instagram: "@emb.meucurso.saobernardo",
    phone: "11 99313-3037",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/6.webp",
    city: "OSASCO | SP",
    url: "https://instagram.com/emb.meucurso.osasco?utm_medium=copy_link",
    instagram: "@emb.meucurso.osasco",
    phone: "11 95849-6119",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/7.webp",
    city: "RIO DE JANEIRO | RJ",
    url: "https://www.instagram.com/meucursorj",
    instagram: "@meucursorj",
    phone: "21 98068-3413",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/8.webp",
    city: "SANTOS | SP",
    url: "https://www.instagram.com/meucursobaixadasantista",
    instagram: "@meucursobaixadasantista",
    phone: "13 99774-0609",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/9.webp",
    city: "VILA VELHA | ES",
    url: "https://www.instagram.com/emb.meucurso.cachoeiro/",
    instagram: "@emb.meucurso.vilavelha",
    phone: "28 99298-0205",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/10.webp",
    city: "JUIZ DE FORA | MG",
    url: "https://www.instagram.com/emb.meucurso.jf/",
    instagram: "@emb.meucurso.jf",
    phone: "32 98403-4797",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/11.webp",
    city: "UBERLÂNDIA | MG",
    url: "https://www.instagram.com/emb.meucurso.uberlandia",
    instagram: "@emb.meucurso.uberlandia",
    phone: "34 99111-5711",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/12.webp",
    city: "CAMPINAS | SP ",
    url: "https://www.instagram.com/meucursocampinas/",
    instagram: "@meucursocampinas",
    phone: "19 98961-9666",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/13.webp",
    city: "SÃO PAULO | SP",
    url: "https://www.instagram.com/_sobredireito/?next=%2F",
    instagram: "@_sobredireito",
    phone: "11 94820-6006",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/14.webp",
    city: "SÃO PAULO | SP",
    url: "https://instagram.com/reginahinoue?utm_medium=copy_link",
    instagram: "@reginahinoue",
    phone: "11 97687-3827",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/15.webp",
    city: "SÃO JOSÉ DOS CAMPOS | SP",
    url: "https://www.instagram.com/meucursosjc/",
    instagram: "@meucursosjc",
    phone: "12 99758-8016",
  },
  {
    regionId: 4,
    img: "assets/images/Embaixadores e Consultores/Sudeste/16.webp",
    city: "TAUBATÉ | SP",
    url: "https://www.instagram.com/meucursotaubate/",
    instagram: "@meucursotaubate",
    phone: "11 98242-5055",
  },
  {
    regionId: 5,
    img: "assets/images/Embaixadores e Consultores/Sul/1.webp",
    city: "PORTO ALEGRE | RS",
    url: "https://www.instagram.com/embaixadormeucurso.poa/",
    instagram: "@embaixadormeucurso.poa",
    phone: "51 98994-4725",
  },
  {
    regionId: 5,
    img: "assets/images/Embaixadores e Consultores/Sul/2.webp",
    city: "CASCAVEL | PR",
    url: "https://www.instagram.com/emb.meucurso.cascavel/",
    instagram: "@emb.meucurso.cascavel",
    phone: "45 99950-8558",
  },
  {
    regionId: 5,
    img: "assets/images/Embaixadores e Consultores/Sul/3.webp",
    city: "MARINGÁ / PR",
    url: "https://instagram.com/emb.meucurso.maringa?utm_medium=copy_link",
    instagram: "@emb.meucurso.maringa",
    phone: "44 99802-5837",
  },
  {
    regionId: 6,
    img: "assets/images/Embaixadores e Consultores/Consultores/1.webp",
    city: "SÃO PAULO - SP",
    url: "/",
    instagram: "Leticia Lins",
    phone: "11 98067-8717",
  },
  {
    regionId: 6,
    img: "assets/images/Embaixadores e Consultores/Consultores/2.webp",
    city: "SÃO PAULO - SP",
    url: "/",
    instagram: "Ruth de Oliveira",
    phone: "11 94376-0180",
  },
  {
    regionId: 6,
    img: "assets/images/Embaixadores e Consultores/Consultores/3.webp",
    city: "SÃO PAULO - SP",
    url: "/",
    instagram: "Izabele Manzieri",
    phone: "11 91460-3336",
  },
  {
    regionId: 6,
    img: "assets/images/Embaixadores e Consultores/Consultores/4.webp",
    city: "COSMÓPOLIS - SP",
    url: "/",
    instagram: "Rosana Pries",
    phone: "19 99222-1480",
  },
];
export default Embaixadores;
