import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Clear, Close, Remove } from "@mui/icons-material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph, Tiny } from "components/Typography";
import CartBag from "components/icons/CartBag";
import { CartItem, useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

// =========================================================
type MiniCartProps = { toggleSidenav: () => void };
// =========================================================

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav }) => {
  const [address, setAddress] = useState();

  const { push } = useRouter();
  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [localProducts, setLocalProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const cartList = state.cart;

  const getTotalPrice = () => {
    return cartProducts.reduce(
      (accum, item) => accum + item.Price * item.Qty,
      0
    );
  };

  const handleNavigate = (path: string) => () => {
    toggleSidenav();
    push(path);
  };

  const fetchLocalItems = async () => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  };

  const fetchCartItems = async () => {
    if (session) {
      const cartData = JSON.parse(localStorage.getItem("apiResponseData"));
      await axios
        .get(
          `https://apiecommerce.meucurso.com.br/BIPEStore/GetOrderDetails?OrderId=${cartData?.OrderId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        )
        .then((response) => {
          setCartProducts(
            response.data.Items.filter(
              (item) => item.OrderItemProductLevelId === 1
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteCartItems = (OrderId, StoreId, SKU) => {
    axios
      .delete(
        `https://apiecommerce.meucurso.com.br/BIPEStore/DeleteFromCart?OrderId=${OrderId}&StoreId=${StoreId}&SKU=${SKU}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then(() => {
        const apiResponseData = JSON.parse(
          localStorage.getItem("apiResponseData")
        );

        if (apiResponseData && apiResponseData.Items) {
          apiResponseData.Items = apiResponseData.Items.filter(
            (item) => item.SKU !== SKU
          );

          if (apiResponseData.Items.length > 1) {
            localStorage.setItem(
              "apiResponseData",
              JSON.stringify(apiResponseData)
            );
          } else {
            localStorage.removeItem("apiResponseData");
          }
        }

        setCartProducts((prev) =>
          prev.filter((product) => product.SKU !== SKU)
        );
      });
  };

  useEffect(() => {
    fetchCartItems();
    fetchLocalItems();
  }, []);

  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width={380} height={"100%"} />
      )}
      {!loading && (
        <>
          <Box width="100%" maxWidth={380}>
            <Box
              overflow="auto"
              height={`calc(100vh - ${
                !!cartProducts.length ? "80px - 3.25rem" : "0px"
              })`}
            >
              <FlexBetween mx={3} height={74}>
                <FlexBox gap={1} alignItems="center" color="black">
                  <CartBag color="error" />

                  <Paragraph lineHeight={0} fontWeight={600}>
                    {cartProducts.length} item
                  </Paragraph>
                </FlexBox>

                <IconButton onClick={toggleSidenav}>
                  <Clear />
                </IconButton>
              </FlexBetween>

              <Divider />
              {loading && (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
              {!cartProducts.length && (
                <FlexBox
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  height="calc(100% - 74px)"
                >
                  <img
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "auto" }}
                    src="/assets/images/Bipe/_2.png"
                    alt="banner"
                  />
                  <Box
                    component="p"
                    mt={2}
                    mx={5}
                    color="grey.600"
                    textAlign="center"
                    maxWidth="200px"
                  >
                    Seu carrinho está vazio!
                  </Box>
                </FlexBox>
              )}

              {cartProducts.map((item: CartItem) => (
                <FlexBox
                  py={2}
                  px={2.5}
                  key={item.ProductId}
                  alignItems="center"
                  borderBottom={`1px solid ${palette.divider}`}
                >
                  <FlexBox alignItems="center" flexDirection="column">
                    {/* <Button
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </Button>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <Button
                color="primary"
                variant="outlined"
                disabled={item.qty === 1}
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </Button> */}
                  </FlexBox>

                  <Link href={`/product/${item.ProductId}`}>
                    <Avatar
                      alt={item.ProductName}
                      src={item.SmallImageUrl}
                      sx={{ mx: 2, width: 76, height: 76 }}
                    />
                  </Link>
                  <Box
                    flex="1"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Link href={`/product/${item.URLKey}`}>
                      <H5 ellipsis fontSize="14px" className="title">
                        {item.ProductName}
                      </H5>
                    </Link>

                    <Tiny color="grey.600">
                      {currency(item.Price)} x {item.Qty}
                    </Tiny>

                    <Box
                      fontWeight={600}
                      fontSize="14px"
                      color="primary.main"
                      mt={0.5}
                    >
                      {currency(item.Qty * item.Price)}
                    </Box>
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteCartItems(
                        localProducts?.OrderId,
                        localProducts?.StoreId,
                        item.SKU
                      )
                    }
                    sx={{ marginLeft: 2.5 }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </FlexBox>
              ))}
            </Box>

            {cartProducts.length > 0 && (
              <Box p={2.5}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{ mb: "0.75rem", height: "40px" }}
                  onClick={handleNavigate("/cart")}
                >
                  Carrinho ({currency(getTotalPrice())})
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MiniCart;
