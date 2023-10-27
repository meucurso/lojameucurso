import { FC } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ======================================================
type ProductDescriptionProps = { product: Product | null };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const { Description } = product;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: Description }} />
    </>
  );
};

export default ProductDescription;
