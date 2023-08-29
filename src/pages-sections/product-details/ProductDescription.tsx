import { FC } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ======================================================
type ProductDescriptionProps = { product: Product };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const { description } = product;
  return (
    <Box>
      <Box>{description}</Box>
    </Box>
  );
};

export default ProductDescription;
