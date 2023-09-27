import Link from "next/link";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";

import { currency } from "lib";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import ShopLayout1 from "components/layouts/ShopLayout1";

import styled from "@emotion/styled";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const LinkHelper = styled(Link)({
  transition: "0.2s",
  "&:hover": {
    color: "#E3364E",
  },
});

const Cart: NextPage = () => {
  const { data: session } = useSession();
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [cepValue, setCepValue] = useState<any>();
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [localProducts, setLocalProducts] = useState<any>([]);
  const [coupoms, setCoupoms] = useState<any>();
  const [coupomValue, setCoupomValue] = useState<any>("");
  const [sedex, setSedex] = useState<any>(false);
  const [radioValue, setRadioValue] = useState("retirarnaloja");
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [pickupInStore, setPickupInStore] = useState(false);

  const getSubTotalPrice = () =>
    cartProducts.reduce((accum, item) => accum + item.Price * item.Qty, 0);

  const getTotalPrice = () => {
    const subTotal = getSubTotalPrice();
    const discountAmount = coupoms?.DiscountAmount || 0; // Defina como 0 se for indefinido

    return subTotal + shippingPrice - discountAmount;
  };

  const fetchLocalItems = async () => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  };

  const fetchCartItems = async () => {
    if (session) {
      setLoading(true);
      const cartData = JSON.parse(localStorage.getItem("apiResponseData"));
      await axios
        .get(
          `https://apiecommerce.meucurso.com.br/BIPEStore/GetOrderDetails?OrderId=${cartData?.OrderId}&StoreId=${cartData.StoreId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        )
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setCartProducts(
            response.data.Items.filter(
              (item) => item.OrderItemProductLevelId === 1
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleShippingDetails = async (cepValue) => {
    setLoadingButton(true);
    const cartData = JSON.parse(localStorage.getItem("apiResponseData"));
    axios
      .get(
        `https://apiecommerce.meucurso.com.br/BIPEStore/GetShippingDetails?OrderId=${cartData.OrderId}&StoreId=${cartData.StoreId}&Cep=${cepValue}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        setLoadingButton(false);
        setCepValue(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCoupom = async (coupomName) => {
    const cartData = JSON.parse(localStorage.getItem("apiResponseData"));

    axios
      .get(
        `https://apiecommerce.meucurso.com.br/Coupons/ValidCoupon?OrderId=${cartData.OrderId}&CouponName=${coupomName}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        setCoupoms(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCartItems = (OrderId, StoreId, SKU) => {
    axios
      .delete(
        `https://apiecommerce.meucurso.com.br/BIPEStore/DeleteFromCart?OrderId=${OrderId}&StoreId=${StoreId}&SKU=${SKU}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then(() => {
        setCartProducts((prev) =>
          prev.filter((product) => product.SKU !== SKU)
        );
      });
  };

  useEffect(() => {
    fetchCartItems();
    fetchLocalItems();
  }, []);

  const handleAddressChange = (event) => {
    const selectedAddressId = event.target.value;
    setAddress(selectedAddressId);

    const selectedAddress = session.user.StudentAddress.find(
      (item) => item.StudentAddressId === selectedAddressId
    );

    if (selectedAddress) {
      setCep(selectedAddress.PostalCode);
    } else {
      setCep("");
    }
  };

  const handleSedex = () => {
    setSedex(true);
  };
  const handlePickUpStore = () => {
    setSedex(false);
    setPickupInStore(true);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    if (e.target.value === "retirarnaloja") {
      setPickupInStore(true);
    } else {
      setPickupInStore(false);
    }
  };

  const shippingPrice = pickupInStore
    ? 0
    : cepValue
        ?.flatMap((value) =>
          value.ShippingInformations.filter(
            (item) => item.ServiceDescription === "SEDEX"
          ).map((value) => Number(value.ShippingPrice))
        )
        .shift() || 0;

  const shippingProduct = localProducts?.Items?.some(
    (product) => product.ProductTypeId === 4 || product.ProductTypeId === 2
  );

  return (
    <>
      {loading && (
        <>
          <CheckoutNavLayout>
            <Grid container spacing={3}>
              <Grid item md={8}>
                <Skeleton variant="rounded" width={"100%"} height={150} />
              </Grid>
              <Grid item md={4}>
                <Skeleton variant="rounded" width={"100%"} height={570} />
              </Grid>
            </Grid>
          </CheckoutNavLayout>
        </>
      )}
      {!loading && (
        <>
          {!cartProducts.length && (
            <ShopLayout1>
              <SEO title="Carrinho" />

              <Grid container>
                <Grid item md={12} textAlign={"center"}>
                  <h1>Seu carrinho está vazio!</h1>
                </Grid>
              </Grid>
            </ShopLayout1>
          )}
          {session && (
            <>
              <CheckoutNavLayout>
                <SEO title="Carrinho" />

                <Grid container spacing={3}>
                  {/* CART PRODUCT LIST */}
                  {loading && (
                    <Skeleton variant="rounded" width={500} height={600} />
                  )}
                  {!loading && (
                    <Grid item md={8} xs={12}>
                      {cartProducts.map((item) => (
                        <>
                          <ProductCard7
                            onClickFunction={() =>
                              handleDeleteCartItems(
                                localProducts?.OrderId,
                                localProducts?.StoreId,
                                item.SKU
                              )
                            }
                            key={item.OrderItemId}
                            {...item}
                          />
                        </>
                      ))}
                    </Grid>
                  )}

                  {/* CHECKOUT FORM */}
                  <Grid item md={4} xs={12}>
                    <Card sx={{ padding: 3 }}>
                      <FlexBetween mb={2}>
                        <Span color="grey.600">Subtotal:</Span>

                        <Span
                          fontSize={18}
                          fontWeight={600}
                          lineHeight="1"
                        >
                          {currency(getSubTotalPrice())}
                        </Span>
                      </FlexBetween>
                      <FlexBetween mb={2}>
                        <Span color="grey.600">Cupom:</Span>

                        <Span
                          fontSize={18}
                          fontWeight={600}
                          lineHeight="1"
                          color={"green"}
                        >
                          - {currency(coupoms?.DiscountAmount)}
                        </Span>
                      </FlexBetween>
                      <FlexBetween mb={2}>
                        <Span color="grey.600">Frete:</Span>

                        <Span
                          fontSize={18}
                          fontWeight={600}
                          lineHeight="1"
                          color={"#D23F57"}
                        >
                          +{currency(shippingPrice)}
                        </Span>
                      </FlexBetween>
                      <FlexBetween mb={2}>
                        <Span color="grey.600">Total:</Span>

                        <Span
                          fontSize={18}
                          fontWeight={600}
                          lineHeight="1"
                        >
                          {shippingPrice === undefined ? (
                            <>{currency(getSubTotalPrice())}</>
                          ) : (
                            <>{currency(getTotalPrice())}</>
                          )}
                        </Span>
                      </FlexBetween>

                      <Divider sx={{ mb: 2 }} />

                      <TextField
                        value={coupomValue}
                        onChange={(e) => setCoupomValue(e.target.value)}
                        fullWidth
                        size="small"
                        label="Cupom"
                        variant="outlined"
                        placeholder="Cupom"
                      />

                      <Button
                        onClick={() => handleCoupom(coupomValue)}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, mb: 4 }}
                      >
                        Aplicar Cupom
                      </Button>

                      <Divider sx={{ mb: 2 }} />
                      {shippingProduct && (
                        <>
                          <FormControl sx={{ mb: 2 }}>
                            <FormLabel id="demo-radio-buttons-group-label">
                              <Span color="grey.600">Tipo de entrega</Span>
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                              onChange={handleRadioChange}
                              value={radioValue}
                            >
                              <FormControlLabel
                                onClick={handlePickUpStore}
                                value="retirarnaloja"
                                control={<Radio />}
                                label="Retirar na Loja"
                              />
                              <FormControlLabel
                                onClick={handleSedex}
                                value="sedex"
                                control={<Radio />}
                                label="Sedex"
                              />
                            </RadioGroup>
                          </FormControl>
                          {sedex && (
                            <>
                              <TextField
                                helperText={
                                  <LinkHelper
                                    target="_blank"
                                    href="https://aluno.meucurso.com.br/Account/MyAccount"
                                  >
                                    Caso queira registrar um novo endereço,
                                    clique aqui!
                                  </LinkHelper>
                                }
                                select
                                value={address}
                                fullWidth
                                size="small"
                                label="Endereços"
                                variant="outlined"
                                placeholder="Selecione seu endereço"
                                onChange={handleAddressChange}
                              >
                                {session.user.StudentAddress.map(
                                  (item, index) => (
                                    <MenuItem
                                      value={item.StudentAddressId}
                                      key={index}
                                    >
                                      {item.AddressLine1} - {item.Number} -{" "}
                                      {item.CityName}- {item.StateName}
                                    </MenuItem>
                                  )
                                )}
                              </TextField>

                              <TextField
                                disabled
                                fullWidth
                                size="small"
                                label="C.E.P"
                                placeholder="3100"
                                variant="outlined"
                                sx={{
                                  mt: 2,
                                  color: "#2b3445",
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#2b3445",
                                  },
                                  "& .MuiFormLabel-root.Mui-disabled": {
                                    color: "#2b3445",
                                  },
                                }}
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                              />
                              <LoadingButton
                                loading={loadingButton}
                                disabled={
                                  cep.length === 0 && address.length === 0
                                }
                                onClick={() => handleShippingDetails(cep)}
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{ my: 2 }}
                              >
                                Calcular frete
                              </LoadingButton>
                            </>
                          )}
                        </>
                      )}

                      <Button
                        disabled={
                          address.length === 0 &&
                          cep.length === 0 &&
                          sedex === true
                        }
                        fullWidth
                        color="primary"
                        href="/checkout"
                        variant="contained"
                        LinkComponent={Link}
                      >
                        Realizar Checkout
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </CheckoutNavLayout>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
