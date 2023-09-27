import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../../components/flex-box";
import Product from "models/Product.model";
import { currency } from "lib";
import ChildrenTree from "./ChildrenTree";
import { useSession } from "next-auth/react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

// ================================================================
type ProductIntroProps = { singleProduct: Product };
// ================================================================

const ProductIntro: FC<ProductIntroProps> = ({ singleProduct }) => {
  const {
    Name,
    Children,
    price,
    shortDescription,
    title,
    SmallImageUrl,
    SpecialPrice,
    ProductId,
    SKU,
    thumbnail,
    URLKey,
  } = singleProduct;

  const { state, dispatch } = useAppContext();
  const [productChild, setProductChild] = useState(null);
  const [updatedFamilyTree, setUpdatedFamilyTree] = useState(null);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const [updatedPrice, setUpdatedPrice] = useState(
    singleProduct.SpecialPrice
  );

  const updatePrice = (specialPrice: number) => {
    setUpdatedPrice(singleProduct.SpecialPrice + specialPrice);
  };

  useEffect(() => {
    if (productChild && productChild.SpecialPrice) {
      updatePrice(productChild.SpecialPrice);
    }
  }, [productChild]);

  function updateNestedObject(arr, targetID, updates) {
    return arr.map((item) => {
      if (item?.ProductId === targetID) {
        return { ...item, ...updates };
      } else if (item?.Children && item?.Children?.length > 0) {
        const updatedChildren = updateNestedObject(
          item?.Children,
          targetID,
          updates
        );
        return {
          ...item,
          Children: updatedChildren,
        };
      }
      return item;
    });
  }

  const updatedSingleProduct = updateNestedObject(
    singleProduct?.Children,
    updatedFamilyTree?.ProductId,
    updatedFamilyTree
  );

  const handleCartAmountChange = (amount: number) => () => {
    setLoading(true);
    let cartItem;
    if (singleProduct.ProductId === updatedFamilyTree?.ProductId) {
      cartItem = {
        price: updatedPrice,
        qty: amount,
        name: updatedFamilyTree.Name,
        imgUrl: updatedFamilyTree.SmallImageUrl,
        ProductId,
        Children: updatedFamilyTree.Children,
        SKU: updatedFamilyTree.SKU,
        URLKey: updatedFamilyTree.URLKey,
        Selected: true,
      };

      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cartItem,
      });
    } else {
      cartItem = {
        price: updatedPrice,
        qty: amount,
        name: singleProduct.Name,
        imgUrl: singleProduct.SmallImageUrl,
        ProductId,
        Children: updatedSingleProduct,
        SKU: singleProduct.SKU,
        URLKey: singleProduct.URLKey,
        Selected: true,
      };

      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cartItem,
      });
    }
    axios
      .post(
        "https://apiecommerce.meucurso.com.br/BIPEStore/AddToCart",
        {
          CustomerId: session.user.CustomerId,
          StoreId: 5,
          Children: [cartItem],
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.Token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        const responseData = response.data;

        localStorage.setItem(
          "apiResponseData",
          JSON.stringify(responseData)
        );
        console.log(responseData);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(err, {
          variant: "error",
        });
        console.log(err);
      });
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
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

          <FlexBox overflow="auto"></FlexBox>
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
          <h4>Selecione a opção: </h4>
          <ChildrenTree
            selectedChild={productChild}
            setSelectedChild={setProductChild}
            familyTree={singleProduct}
            setUpdatedFamilyTree={setUpdatedFamilyTree}
            updatedFamilyTree={updatedFamilyTree}
            selectedButtonId={selectedButtonId}
            setSelectedButtonId={setSelectedButtonId}
          />

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              12 x de {currency(updatedPrice / 12)} (PayPal)
            </H2>
            <s>{currency(singleProduct.Price)}</s>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(updatedPrice)}
            </H2>
          </Box>

          <LoadingButton
            loading={loading}
            color="primary"
            type="submit"
            variant="contained"
            onClick={handleCartAmountChange(1)}
            sx={{ mb: 4.5, px: "1.75rem", height: 40 }}
            disabled={singleProduct.Children.length > 0 && !productChild}
          >
            Adicionar ao Carrinho
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
