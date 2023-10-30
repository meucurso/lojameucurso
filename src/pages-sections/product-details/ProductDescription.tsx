import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { H2, H3, H4 } from "components/Typography";
import { format } from "date-fns";
import Product from "models/Product.model";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// ======================================================
type ProductDescriptionProps = { product: Product | null };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const { Description, StartDate, EndDate, UnitsQuantity, Online } =
    product;

  return (
    <>
      <Grid textAlign={"center"} container spacing={5} mb={5}>
        <Grid item md={3}>
          <AccessTimeIcon sx={{ fontSize: 40 }} color={"primary"} />
          <H4>Carga Horária</H4>
          <p> {(UnitsQuantity * 30) / 60} horas</p>
        </Grid>
        <Grid item md={3}>
          <PlayCircleIcon sx={{ fontSize: 40 }} color={"primary"} />
          <H4>Aulas</H4>
          <p> {UnitsQuantity}</p>
        </Grid>
        <Grid item md={3}>
          <CalendarMonthIcon sx={{ fontSize: 40 }} color={"primary"} />
          <H4>Data de Início</H4>
          <p> {format(new Date(StartDate), "dd/MM/yyyy")}</p>
        </Grid>
        <Grid item md={3}>
          <CalendarMonthIcon sx={{ fontSize: 40 }} color={"primary"} />
          <H4>Data de Término</H4>
          <p> {format(new Date(EndDate), "dd/MM/yyyy")}</p>
        </Grid>
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: Description }} />
    </>
  );
};

export default ProductDescription;
