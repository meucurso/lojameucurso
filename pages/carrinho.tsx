import Link from "next/link";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Paragraph, Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";

import { currency } from "lib";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
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
import { useRouter } from "next/router";
import { useCart } from "contexts/CartContext";

const LinkHelper = styled(Link)({
  transition: "0.2s",
  "&:hover": {
    color: "#E3364E",
  },
});

const Carrinho: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [cepValue, setCepValue] = useState<any>();
  const [localProducts, setLocalProducts] = useState<any>([]);
  const [studentAddress, setStudentAddress] = useState<any>([]);
  const [coupoms, setCoupoms] = useState<any>();
  const [coupomValue, setCoupomValue] = useState<any>("");
  const [cupomText, setCoupomText] = useState("");
  const [sedex, setSedex] = useState<any>(false);
  const [radioValue, setRadioValue] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [pickupInStore, setPickupInStore] = useState(false);

  const { cartProducts, setCartProducts, fetchCartItems, orderId } =
    useCart();

  const getSubTotalPrice = () =>
    cartProducts.reduce((accum, item) => accum + item.Price * item.Qty, 0);

  const getTotalPrice = () => {
    const subTotal = getSubTotalPrice();
    const discountAmount = coupoms?.DiscountAmount || 0;

    return subTotal + shippingPrice - discountAmount;
  };

  const handleCheckout = () => {
    const apiResponseData = JSON.parse(
      localStorage.getItem("apiResponseData")
    );
    if (sedex) {
      apiResponseData.Coupon = coupomValue;
      apiResponseData.OrderShippingPackages = shippingSEDEXInformations;
      apiResponseData.BillingAddressId = address;
      apiResponseData.DigitalAdressId = billingAndShippingId[0];
      apiResponseData.ShippingAddressId = address;
      apiResponseData.Price = getTotalPrice();
      apiResponseData.SubTotalPrice = getSubTotalPrice();
      apiResponseData.Frete = shippingPrice;
      apiResponseData.Cupom = coupoms?.DiscountAmount;

      localStorage.setItem(
        "apiResponseData",
        JSON.stringify(apiResponseData)
      );
    } else if (pickupInStore) {
      const pickStore = {
        ServiceCode: 0,
        ServiceDescription: "Retirar na loja",
        DeliveryTime: 0,
        ShippingPrice: 0,
      };

      apiResponseData.Coupon = coupomValue;
      apiResponseData.OrderShippingPackages = [pickStore];
      apiResponseData.BillingAddressId = address;
      apiResponseData.DigitalAdressId = billingAndShippingId[0];
      apiResponseData.ShippingAddressId = address;
      apiResponseData.Price = getTotalPrice();
      apiResponseData.SubTotalPrice = getSubTotalPrice();
      apiResponseData.Frete = shippingPrice;
      apiResponseData.Cupom = coupoms?.DiscountAmount;

      localStorage.setItem(
        "apiResponseData",
        JSON.stringify(apiResponseData)
      );
    } else if (radioValue === "") {
      apiResponseData.Coupon = coupomValue;
      apiResponseData.OrderShippingPackages = [];
      apiResponseData.BillingAddressId = address;
      apiResponseData.DigitalAdressId = billingAndShippingId[0];
      apiResponseData.ShippingAddressId = address;
      apiResponseData.Price = getTotalPrice();
      apiResponseData.SubTotalPrice = getSubTotalPrice();
      apiResponseData.Frete = shippingPrice;
      apiResponseData.Cupom = coupoms?.DiscountAmount;

      localStorage.setItem(
        "apiResponseData",
        JSON.stringify(apiResponseData)
      );
    }
    router.push("/pagamento");
  };

  const handleCoupom = async (coupomName) => {
    const cartData = JSON.parse(localStorage.getItem("apiResponseData"));

    axios
      .get(
        `https://apiecommerce.meucurso.com.br/Coupons/ValidCoupon?OrderId=${cartData.OrderId}&CouponName=${coupomName}&StoreId=${cartData.StoreId}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        setCoupoms(response.data);
        setCoupomText("Cupom aplicado!");
        if (response.data === null) {
          setCoupomText("Cupom Inválido");
        }
      })
      .catch((err) => {
        setCoupomText("Cupom Iinválido");
        console.log(err);
      });
  };

  const handleDeleteCartItems = (OrderId, SKU) => {
    axios
      .delete(
        `https://apiecommerce.meucurso.com.br/BIPEStore/DeleteFromCart?OrderId=${OrderId}&SKU=${SKU}`,
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

  const handleAddressChange = (event) => {
    const selectedAddressId = event.target.value;
    setAddress(selectedAddressId);

    const selectedAddress = studentAddress.find(
      (item) => item.StudentAddressId === selectedAddressId
    );

    if (selectedAddress) {
      setCep(selectedAddress.PostalCode);
    } else {
      setCep("");
    }
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    if (e.target.value === "SEDEX") {
      setPickupInStore(false);
      setSedex(true);
      const selectedCarrier = shippingInfo.find(
        (carrier) => carrier.ServiceDescription === "SEDEX"
      );
      if (selectedCarrier) {
        setShippingPrice(Number(selectedCarrier.ShippingPrice));
      } else {
        setShippingPrice(0);
      }
    } else if (e.target.value === "Retirar na loja") {
      setPickupInStore(true);
      setSedex(false);
      setShippingPrice(0);
    } else {
      setPickupInStore(false);
      setSedex(false);
      setShippingPrice(0);
    }
  };

  const shippingSEDEXInformations = cepValue?.flatMap((value) =>
    value.ShippingInformations.filter(
      (item) => item.ServiceDescription === "SEDEX"
    ).map((value) => ({
      ...value,
      StorageId: cepValue[0].StorageId,
    }))
  );

  const shippingProduct = cartProducts.some(
    (product) => product.ProductTypeId === 4 || product.ProductTypeId === 2
  );

  const billingAndShippingId = studentAddress.map(
    (address) => address.StudentAddressId
  );

  const fetchAddress = useCallback(async () => {
    setLoadingAddress(true);
    if (session) {
      try {
        const response = await axios.get(
          `https://apiecommerce.meucurso.com.br/Student/Address?CustomerId=${session?.user?.CustomerId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        );
        setLoadingAddress(false);
        setStudentAddress(response.data);
      } catch (err) {
        setLoadingAddress(false);
        console.log(err);
      }
    }
  }, [session]);

  const fetchLocalItems = useCallback(() => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  }, []);

  useEffect(() => {
    const fetchShippingDetails = async (cepValue) => {
      setLoadingButton(true);
      axios
        .get(
          `https://apiecommerce.meucurso.com.br/Shipping/GetShippingDetails?OrderId=${orderId}&StoreId=5&Cep=${cepValue}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        )
        .then((response) => {
          setLoadingButton(false);
          setCepValue(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchCartItems();
    fetchLocalItems();
    fetchAddress();
    if (cep) {
      fetchShippingDetails(cep);
    }
  }, [
    fetchCartItems,
    fetchLocalItems,
    fetchAddress,
    cep,
    orderId,
    session?.user?.Token,
  ]);

  const shippingInfo = cepValue?.flatMap(
    (item) => item.ShippingInformations
  );

  return (
    <>
      {!cartProducts.length && (
        <ShopLayout1>
          <SEO
            title="Carrinho"
            sitename="MeuCurso - Do seu jeito. No seu tempo."
          />

          <Grid container>
            <Grid item md={12} textAlign={"center"}>
              <h1>Seu carrinho está vazio!</h1>
            </Grid>
          </Grid>
        </ShopLayout1>
      )}
      {session && cartProducts.length > 0 && (
        <>
          <CheckoutNavLayout>
            <SEO
              title="Carrinho"
              sitename="MeuCurso - Do seu jeito. No seu tempo."
            />

            <Grid container spacing={3}>
              {/* CART PRODUCT LIST */}
              {/* {loading && (
                    <Skeleton variant="rounded" width={500} height={600} />
                  )} */}
              {/* {!loading && ( */}
              <Grid item md={8} xs={12}>
                {cartProducts.map((item) => (
                  <ProductCard7
                    onClickFunction={() =>
                      handleDeleteCartItems(orderId, item.SKU)
                    }
                    key={item.OrderItemId}
                    {...item}
                  />
                ))}
              </Grid>
              {/* )} */}

              {/* CHECKOUT FORM */}
              <Grid item md={4} xs={12}>
                <Card sx={{ padding: 3 }}>
                  <FlexBetween mb={2}>
                    <Span color="grey.600">Subtotal:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
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
                  <FlexBetween>
                    <Span color="grey.600">Total:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
                      {shippingPrice === undefined ? (
                        <div>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            {currency(getSubTotalPrice())}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Paragraph
                              fontSize={13}
                              fontWeight={600}
                              lineHeight="1"
                              textAlign={"end"}
                              sx={{ width: "150px" }}
                            >
                              ou em até{" "}
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                12x{" "}
                              </span>{" "}
                              de{" "}
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {currency(getSubTotalPrice() / 12)}
                              </span>{" "}
                              no cartão de crédito
                            </Paragraph>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            {currency(getTotalPrice())}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Paragraph
                              fontSize={13}
                              fontWeight={600}
                              lineHeight="1"
                              textAlign={"end"}
                              sx={{ width: "150px" }}
                            >
                              ou em até{" "}
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                12x{" "}
                              </span>{" "}
                              de{" "}
                              <span
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {currency(getTotalPrice() / 12)}
                              </span>{" "}
                              no cartão de crédito
                            </Paragraph>
                          </div>
                        </div>
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
                    helperText={cupomText}
                  />

                  <Button
                    disabled={coupomValue.length <= 0}
                    onClick={() => handleCoupom(coupomValue)}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 4 }}
                  >
                    Aplicar Cupom
                  </Button>
                  <TextField
                    helperText={
                      <LinkHelper
                        target="_blank"
                        href="https://aluno.meucurso.com.br/Account/MyAccount"
                      >
                        Caso queira registrar um novo endereço, clique
                        aqui!
                      </LinkHelper>
                    }
                    select
                    value={address}
                    fullWidth
                    size="small"
                    label="Endereços"
                    variant="outlined"
                    onChange={handleAddressChange}
                  >
                    {studentAddress.map((item, index) => (
                      <MenuItem value={item.StudentAddressId} key={index}>
                        {item.AddressLine1} - {item.Number} -{" "}
                        {item.CityName}- {item.StateName}
                      </MenuItem>
                    ))}
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
                  <Divider sx={{ mb: 2 }} />
                  {shippingProduct && address && (
                    <>
                      <FormControl sx={{ mb: 2 }}>
                        <FormLabel id="demo-radio-buttons-group-label">
                          <Span color="grey.600">Tipo de entrega</Span>
                        </FormLabel>
                        {shippingInfo?.map((carriers, index) => (
                          <RadioGroup
                            key={index}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={handleRadioChange}
                            value={radioValue}
                          >
                            <FormControlLabel
                              value={carriers.ServiceDescription}
                              control={<Radio />}
                              label={carriers.ServiceDescription}
                            />
                          </RadioGroup>
                        ))}
                      </FormControl>
                    </>
                  )}

                  <Button
                    onClick={handleCheckout}
                    disabled={!address}
                    fullWidth
                    color="primary"
                    variant="contained"
                    LinkComponent={Link}
                  >
                    Finalizar Compra
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </CheckoutNavLayout>
        </>
      )}
    </>
  );
};

export default Carrinho;
