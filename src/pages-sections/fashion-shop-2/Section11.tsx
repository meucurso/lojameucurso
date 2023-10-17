import { Box, Container, Grid, styled } from "@mui/material";
import { H2 } from "components/Typography";
import Image from "next/image";

interface Section11Props {}

const Images = styled("img")({
  borderRadius: "5px",
  filter: "grayscale(1)",
  cursor: "pointer",
  transition: "0.2s",
  ":hover": {
    filter: "none",
  },
});

export function Section11({}: Section11Props) {
  return (
    <Container sx={{ my: 8 }}>
      <Grid
        container
        spacing={5}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <Grid item md={12} textAlign={"center"}>
          <H2>Aplicativos MeuCurso</H2>
        </Grid>
        <Grid item sm={12} md={6} justifyContent={"center"}>
          <Images
            width={300}
            height={"auto"}
            src="icone_nomenalista.png"
            alt="icone aplicativo nomenalista"
          />
        </Grid>
        <Grid item md={6} justifyContent={"center"}>
          <Images
            style={{
              objectFit: "cover",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            width={300}
            height={240}
            src="icone_verticalizado.png"
            alt="icone aplicativo nomenalista"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
