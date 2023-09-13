import { FC } from "react";
import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";

// styled component
const StyledLink = styled(Link)(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": { color: theme.palette.grey[100] },
}));

const Footer1: FC = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container sx={{ p: "1rem", color: "white" }}>
          <Box
            textAlign={{ xs: "center", lg: "start" }}
            py={10}
            overflow="hidden"
          >
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image
                    mx={{ xs: "auto", lg: "0" }}
                    height={60}
                    mb={0}
                    src="/assets/images/logo_meucurso_branco (1).png"
                    alt="logo"
                  />
                </Link>

                <Box mb={2.5} color="grey.500">
                  MEU CURSO INTELIGENCIA E TECNOLOGIA EDUCACIONAL LTDA
                  <Box>CNPJ: 30.976.221/0001-60</Box>
                </Box>

                <AppStore />
              </Grid>
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Sobre
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href={item.url} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                </div>
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Contato
                </Box>

                <Box py={0.6} color="grey.500">
                  Endereço: Rua Luis Coelho, 340
                </Box>

                <Box py={0.6} color="grey.500">
                  E-mail: contato@meucurso.com.br
                </Box>

                <Box py={0.6} color="grey.500">
                  Telefone: (11) 4200-4460
                </Box>

                <Box py={0.6} fontWeight={"bolder"} color="grey.500">
                  Atendimento Presencial
                </Box>
                <Box py={0.6} color="grey.500">
                  2ª a 6ª: das 09:00 às 20:00
                </Box>
                <Box py={0.6} color="grey.500">
                  Sábado das 08:00 às 13:00
                </Box>
                <Box py={0.6} fontWeight={"bolder"} color="grey.500">
                  Canal de Atendimento
                </Box>

                <Box py={0.6} color="grey.500">
                  2ª a 6ª: das 09:00 às 20:00
                </Box>
                <Box py={0.6} mb={2} color="grey.500">
                  Sábado das 08:00 às 14:00
                </Box>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Atendimento
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href={item.url} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                  <FlexBox className="flex" mx={-0.625} mt={10}>
                    {iconList.map((item, ind) => (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer noopenner"
                        key={ind}
                        style={{ margin: "auto" }}
                      >
                        <IconButton
                          sx={{
                            margin: 0.5,

                            fontSize: 12,
                            padding: "10px",
                            backgroundColor: "rgba(0,0,0,0.2)",
                          }}
                        >
                          <item.icon
                            fontSize="inherit"
                            sx={{ color: "white" }}
                          />
                        </IconButton>
                      </a>
                    ))}
                  </FlexBox>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  {
    name: "Sobre o MeuCurso",
    url: "/sobre",
  },
  {
    name: "/Professores",
    url: "/professor",
  },
  {
    name: "Embaixadores",
    url: "/embaixadores",
  },
  {
    name: "Parceiros",
    url: "/parceiros",
  },
  {
    name: "Trabalhe Conosco",
    url: "https://meucurso.solides.jobs/",
  },
  {
    name: "Depoimentos",
    url: "/depoimentos",
  },
  {
    name: "Livraria",
    url: "/livraria",
  },
  {
    name: "Canal no Youtube",
    url: "http://www.youtube.com/meucursooficial",
  },
  {
    name: "Blog",
    url: "http://blog.meucurso.com.br/",
  },
];

const customerCareLinks = [
  {
    name: "Central de ajuda",
    url: "/central-de-ajuda",
  },
  {
    name: "Perguntas frequentes",
    url: "/central-de-ajuda",
  },
  {
    name: "Requisitos mínimos",
    url: "/central-de-ajuda",
  },
  {
    name: "Política de privacidade",
    url: "/politica-de-privacidade",
  },
  {
    name: "Termos de uso",
    url: "/termos-de-uso",
  },
];

const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/meucursooficial" },
  { icon: Twitter, url: "https://twitter.com/meucursooficial" },
  {
    icon: Youtube,
    url: "https://www.youtube.com/@MeuCursooficial",
  },
  { icon: Instagram, url: "https://www.instagram.com/meucursooficial/" },
];

export default Footer1;
