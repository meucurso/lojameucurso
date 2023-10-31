import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import Section1 from "pages-sections/fashion-shop-2/Section1";
import { Box, Card, Container, Grid, useTheme } from "@mui/material";
import { useBanners } from "hooks/useBanners";
import api from "utils/__api__/meu-curso";

interface blackProps {}

export default function Black({}: blackProps) {
  const { banners } = useBanners(api.getIndexBanners("5"));

  return (
    <ShopLayout1>
      <SEO title="Black Friday" sitename="MeuCurso" />
      <Container disableGutters={true} maxWidth="xl">
        <Section1 carouselData={banners} />
        <Container></Container>
      </Container>
    </ShopLayout1>
  );
}
