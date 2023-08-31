import Link from "next/link";
import { FC, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
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

const CardMedia = styled(Box)(({ theme }) => ({
  maxHeight: 300,
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
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem: CartItem | undefined = state.cart.find(
    (item) => item.URLKey === product.URLKey
  );

  // handle favourite
  const handleFavorite = () => setIsFavorite((fav) => !fav);

  // handle add to cart
  const handleAddToCart = (product: Product) => () => {
    const payload = {
      ProductId: product.ProductId,
      URLKey: product.URLKey,
      name: product.Name,
      price: product.SpecialPrice,
      imgUrl: product.SmallImageUrl,
      ShortDescription: product.ShortDescription,
      qty: (cartItem?.qty || 0) + 1,
    };

    dispatch({ type: "CHANGE_CART_AMOUNT", payload });
    enqueueSnackbar("Adicionado ao Carrinho", { variant: "success" });
  };

  return (
    <Card>
      <CardMedia>
        <Link href={`/product/${product.URLKey}`}>
          {/* <LazyImage
            width={300}
            height={300}
            alt="category"
            className="product-img"
            src={product.SmallImageUrl}
          /> */}
          <img
            src={product.SmallImageUrl}
            width={"100%"}
            height={220}
            style={{
              objectFit: "contain",
              aspectRatio: "16/9",
            }}
          />
        </Link>

        <AddToCartButton
          className="product-actions"
          onClick={handleAddToCart(product)}
        >
          <AddShoppingCart color="disabled" fontSize="small" />
        </AddToCartButton>

        <FavouriteButton
          className="product-actions"
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavouriteButton>

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
        {/* {product.categories.length > 0 && (
          <Small color="grey.500">{product.categories[0]}</Small>
        )} */}
        <Paragraph fontWeight="bold">{product.Name}</Paragraph>
        <H4 fontWeight={700} py={0.5}>
          {currency(product.SpecialPrice)}
        </H4>

        {/* <FlexRowCenter gap={1}>s
          <Rating
            name="read-only"
            value={4}
            readOnly
            sx={{ fontSize: 16 }}
          />
          <Small fontWeight={600} color="grey.500">
            ({product.reviews.length} Reviews)
          </Small>
        </FlexRowCenter> */}
      </Box>
    </Card>
  );
};

export default ProductCard18;
