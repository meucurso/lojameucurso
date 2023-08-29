import { FC } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ======================================================
type ProductDescriptionProps = { product: Product | null };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  if (!product) {
    // Se product for nulo, você pode renderizar uma mensagem alternativa ou retornar null
    return <Box>No product data available.</Box>;
  }

  // Se product não for nulo, você pode continuar com a renderização
  const { ShortDescription } = product;
  return (
    <Box>
      <Box>{ShortDescription}</Box>
    </Box>
  );
};

export default ProductDescription;
