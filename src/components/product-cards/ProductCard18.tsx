import Link from "next/link";
import { FC, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, IconButton, Chip, styled } from "@mui/material";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { currency } from "lib";
import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import { CartItem, useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import Product from "models/Product.model";

// custom styled components
const Card = styled(Box)({
  ":hover": {
    "& .product-actions": { right: 10 },
    "& img": { transform: "scale(1.1)" },
    "& .product-view-action": { opacity: 1 },
  },
});

const StyledChip = styled(Chip)({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});

const CardMedia = styled(Box)(({ theme }) => ({
  maxHeight: 300,
  aspectRatio: "3/2",
  objectFit: "cover",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",

  "& img": { transition: "0.3s" },
}));

const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
});

const FavouriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s",
});

const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: 0,
  position: "absolute",
  transition: "all 0.3s",
});

// ==============================================================
type ProductCardProps = { product: Product };
// ==============================================================

const ProductCard18: FC<ProductCardProps> = ({ product }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Card>
      <CardMedia>
        <StyledChip color="primary" size="small" label={`25% off`} />
        <Link href={`/product/${product.URLKey}`}>
          <img
            alt={product.Name}
            loading="lazy"
            src={product.SmallImageUrl}
            width={"100%"}
            height={"100%"}
          />
        </Link>

        <QuickViewButton
          fullWidth
          size="large"
          color="dark"
          variant="contained"
          className="product-view-action"
          onClick={() => setOpenDialog(true)}
        >
          Pré-Visualização
        </QuickViewButton>
      </CardMedia>

      <ProductViewDialog
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        product={{
          id: product.ProductId,
          URLKey: product.URLKey,
          title: product.Name,
          price: product.SpecialPrice,
          imgUrl: product.SmallImageUrl,
          shortDescription: product.ShortDescription,
        }}
      />

      <Box p={1} textAlign="center">
        <Paragraph fontWeight="bold">{product.Name}</Paragraph>
        <s>{currency(product.Price)}</s>
        <H4 fontWeight={700} py={0.5}>
          {currency(product.SpecialPrice)}
        </H4>
      </Box>
    </Card>
  );
};

export default ProductCard18;
