import { FC } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ======================================================
type ProductDescriptionProps = { product: Product | null };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  if (!product) {
    return <Box>No product data available.</Box>;
  }

  const { ShortDescription } = product;
  return (
    <div style={{ height: "130vh", width: "100%" }}>
      <iframe
        src="https://docs.google.com/viewer?srcid=151h2GBBUftSDTiaL0oCQR6ARetu6VH2Q&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default ProductDescription;
