import { FC } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ======================================================
type ProductDescriptionProps = { product: Product | null };
// ======================================================

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const { DescriptionFileUrl, ShortDescription } = product;
  if (DescriptionFileUrl === null) {
    return <>{ShortDescription}</>;
  } else {
    return (
      <>
        <div style={{ height: "130vh", width: "100%" }}>
          <iframe
            src={DescriptionFileUrl}
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </>
    );
  }
};

export default ProductDescription;
