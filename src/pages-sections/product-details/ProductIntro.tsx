import Link from "next/link";
import { FC, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../../components/flex-box";
import Product from "models/Product.model";
import { currency } from "lib";
import productVariants from "data/product-variants";

// ================================================================
type ProductIntroProps = { singleProduct: Product };
// ================================================================

const ProductIntro: FC<ProductIntroProps> = ({ singleProduct }) => {
  const {
    Name,
    id,
    price,
    shortDescription,
    title,
    SmallImageUrl,
    SpecialPrice,
    ProductId,

    thumbnail,
    URLKey,
  } = singleProduct;

  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1",
  });

  // HANDLE CHAMGE TYPE AND OPTIONS
  const handleChangeVariant =
    (variantName: string, value: string) => () => {
      setSelectVariants((state) => ({
        ...state,
        [variantName.toLowerCase()]: value,
      }));
    };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find((item) => item.id === id);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: singleProduct.SpecialPrice,
        qty: amount,
        name: singleProduct.Name,
        imgUrl: singleProduct.SmallImageUrl,
        ShortDescription: singleProduct.ShortDescription,
        id,
        URLKey: singleProduct.URLKey,
      },
    });
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            {/* <LazyImage
              alt={title}
              width={150}
              height={150}
              loading="eager"
              src={product.images[selectedImage]}
              sx={{ maxWidth: "100%", height: "auto" }}
            /> */}
            {/* <img
              style={{ maxWidth: "100%", height: "auto" }}
              loading="eager"
              src={product.images[selectedImage]}
              alt={title}
            /> */}
            <img
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                aspectRatio: "16/9",
              }}
              loading="eager"
              src={singleProduct.SmallImageUrl}
              alt={singleProduct.Name}
            />
          </FlexBox>

          <FlexBox overflow="auto">
            {/* {images.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{ cursor: "pointer" }}
                onClick={handleImageClick(ind)}
                mr={ind === images.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar src={url} variant="square" sx={{ height: 40 }} />
              </FlexRowCenter>
            ))} */}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{singleProduct.Name}</H1>

          <FlexBox
            flexDirection={"column"}
            justifyContent={"center"}
            mb={1}
          >
            <p>{singleProduct.ShortDescription}</p>
          </FlexBox>

          {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox> */}

          {productVariants.map((variant) => (
            <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.title}</H6>

              {variant.values.map(({ id, value }) => (
                <Chip
                  key={id}
                  label={value}
                  onClick={handleChangeVariant(variant.title, value)}
                  sx={{ borderRadius: "4px", mr: 1, cursor: "pointer" }}
                  color={
                    selectVariants[variant.title.toLowerCase()] === value
                      ? "primary"
                      : "default"
                  }
                />
              ))}
            </Box>
          ))}

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(singleProduct.SpecialPrice)}
            </H2>
          </Box>

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{ mb: 4.5, px: "1.75rem", height: 40 }}
            >
              Adicionar ao Carrinho
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{ p: 1 }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{ p: 1 }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          {/* <FlexBox alignItems="center" gap={1} mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/scarlett-beauty">
              <H6>Mobile Store</H6>
            </Link>
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
