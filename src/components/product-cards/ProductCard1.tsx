import Link from "next/link";
import { FC, Fragment, useCallback, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Span } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { CartItem, useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { calculateDiscount, currency } from "lib";

// styled components
const StyledBazaarCard = styled(BazaarCard)({
  height: "350px",
  margin: "auto",
  marginBottom: "1rem",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": { "& .hover-box": { opacity: 1 } },
});

const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

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

const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
});

const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ========================================================
type ProductCardProps = {
  title?: string;
  URLKey?: string;
  ShortDescription?: string;
  SpecialPrice?: number;
  price?: number;
  imgUrl?: string;
  rating?: number;
  discount?: number;
  ProductId?: string | number;
  hideRating?: boolean;
  hoverEffect?: boolean;
  showProductSize?: boolean;
};
// ========================================================

const ProductCard1: FC<ProductCardProps> = ({
  ProductId,
  URLKey,
  title,
  SpecialPrice,
  price,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 5,
  showProductSize,
  ShortDescription,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(
    () => setOpenModal((open) => !open),
    []
  );
  const cartItem: CartItem | undefined = state.cart.find(
    (item) => item.URLKey === URLKey
  );

  const handleCartAmountChange =
    (product: CartItem, type?: "remove") => () => {
      dispatch({ type: "CHANGE_CART_AMOUNT", payload: product });
      // SHOW ALERT PRODUCT ADDED OR REMOVE
      if (type === "remove")
        enqueueSnackbar("Remove from Cart", { variant: "error" });
      else enqueueSnackbar("Added to Cart", { variant: "success" });
    };

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* {!!discount && (
          <StyledChip
            color="primary"
            size="small"
            label={`${discount}% off`}
          />
        )} */}

        {/* <HoverIconWrapper className="hover-box">
          <IconButton onClick={toggleDialog}>
            <RemoveRedEye color="disabled" fontSize="small" />
          </IconButton>

          <IconButton onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
          </IconButton>
        </HoverIconWrapper> */}

        <Link href={`/produto/${URLKey}`}>
          {/* <LazyImage
            priority
            src={imgUrl}
            width={500}
            height={500}
            alt={title}
          /> */}
          <img
            style={{
              objectFit: "contain",
              aspectRatio: "16/9",
            }}
            src={imgUrl}
            width={"100%"}
            height={220}
            alt={title}
          />
        </Link>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{ title, SpecialPrice, ProductId, URLKey, imgUrl }}
      />

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/produto/${URLKey}`}>
              <H3
                mb={1}
                title={title}
                fontSize="14px"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {title}
              </H3>
            </Link>

            {/* {!hideRating && (
              <BazaarRating value={rating || 0} color="warn" readOnly />
            )} */}

            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                {showProductSize}
              </Span>
            )}

            <FlexBox alignItems="center" gap={1} mt={0.5}>
              <Box color="grey.600" fontWeight="600">
                <del>{currency(price)}</del>
              </Box>
              <Box fontWeight="600" color="primary.main">
                {/* {calculateDiscount(SpecialPrice, discount)} */}

                {currency(SpecialPrice)}
              </Box>
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={
              !!cartItem?.qty ? "space-between" : "flex-start"
            }
          >
            {/* <Button
              color="primary"
              variant="outlined"
              sx={{ padding: "3px" }}
              onClick={handleCartAmountChange({
                id,
                ShortDescription,
                URLKey,
                SpecialPrice,
                imgUrl,
                name: title,
                qty: (cartItem?.qty || 0) + 1,
              })}
            >
              <Add fontSize="small" />
            </Button> */}

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ padding: "3px" }}
                  onClick={handleCartAmountChange(
                    {
                      ProductId,
                      URLKey,
                      ShortDescription,
                      SpecialPrice,
                      imgUrl,
                      name: title,
                      qty: (cartItem?.qty || 0) - 1,
                    },
                    "remove"
                  )}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard1;
