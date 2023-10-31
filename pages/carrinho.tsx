import Link from "next/link";
import { NextPage } from "next";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";

import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { H1, H2, Paragraph, Span } from "components/Typography";
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
import { useSnackbar } from "notistack";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
  const [studentAddress, setStudentAddress] = useState<any>([]);
  const [coupoms, setCoupoms] = useState<any>();
  const [coupomValue, setCoupomValue] = useState<any>();
  const [cupomText, setCoupomText] = useState("");
  const [sedex, setSedex] = useState<any>(false);
  const [radioValue, setRadioValue] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pickupInStore, setPickupInStore] = useState(false);

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

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

  const handlePaymentFree = () => {
    const requestPayment: any = {};

    requestPayment.OrderId = orderId;
    requestPayment.OrderShippingPackage = [];
    requestPayment.ShippingAddressId = address;

    axios
      .post(
        `https://apiecommerce.meucurso.com.br/BIPEStore/ProcessPaymentFree`,
        requestPayment,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handleCoupom = async (coupomName) => {
    const encodedCoupomName = encodeURIComponent(coupomName);

    axios
      .get(
        `https://apiecommerce.meucurso.com.br/Coupons/ValidCoupon?OrderId=${orderId}&CouponName=${encodedCoupomName}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        console.log(response.data);
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
        handleCoupom(coupomValue);
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
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data, {
          variant: "error",
        })
      );
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
    if (session) {
      try {
        const response = await axios.get(
          `https://apiecommerce.meucurso.com.br/Student/Address?CustomerId=${session?.user?.CustomerId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        );
        setStudentAddress(response.data);
      } catch (err) {
        enqueueSnackbar(err.response.data, {
          variant: "error",
        });
      }
    }
  }, [enqueueSnackbar, session]);

  useEffect(() => {
    const fetchShippingDetails = async (cepValue) => {
      setLoading(true);
      axios
        .get(
          `https://apiecommerce.meucurso.com.br/Shipping/GetShippingDetails?OrderId=${orderId}&Cep=${cepValue}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        )
        .then((response) => {
          setLoading(false);
          setCepValue(response.data);
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(err.response.data, {
            variant: "error",
          });
        });
    };

    fetchCartItems();
    fetchAddress();
    if (cep) {
      fetchShippingDetails(cep);
    }
  }, [
    fetchCartItems,
    fetchAddress,
    cep,
    orderId,
    session?.user?.Token,
    enqueueSnackbar,
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

          <Grid container textAlign={"center"} justifyContent={"center"}>
            <Grid item m={5} md={12}>
              <H2>Seu carrinho está vazio!</H2>
              <img
                loading="lazy"
                style={{ maxWidth: "100%", height: "auto" }}
                src="/assets/images/Bipe/_2.png"
                alt="banner"
              />
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
            <Dialog open={open}>
              <Box sx={{ padding: 5 }}>
                <DialogTitle>
                  <CheckCircleIcon
                    color="success"
                    sx={{
                      fontSize: 75,
                      textAlign: "center",
                      margin: "0 auto",
                      display: "flex",
                    }}
                  />
                  <H2 textAlign={"center"} mt={5}>
                    Compra Finalizada com Sucesso!
                  </H2>
                  <H2 textAlign={"center"} mt={3}>
                    Número do pedido: #{orderId}
                  </H2>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <p
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 25,
                      }}
                    >
                      Acesse sua rota clicando{" "}
                      <a
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                        target="_blank"
                        href="https://aluno.meucurso.com.br/StudyRoute/Index/"
                      >
                        aqui
                      </a>
                    </p>
                    {/* <p
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        marginTop: 2,
                      }}
                    >
                      Ou veja mais informações de sua compra clicando{" "}
                      <a
                        target="_blank"
                        style={{
                          color: "green",
                          textDecoration: "underline",
                        }}
                        href="https://aluno.meucurso.com.br/BIPEStore/Orders"
                      >
                        aqui
                      </a>
                    </p> */}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{ marginTop: 5, color: "white" }}
                    fullWidth
                    href="/"
                  >
                    Voltar para a Tela Inicial
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
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
                  {getTotalPrice() > 0 && (
                    <>
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
                        disabled={coupomValue?.length <= 0}
                        onClick={() => handleCoupom(coupomValue)}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, mb: 4 }}
                      >
                        Aplicar Cupom
                      </Button>
                    </>
                  )}
                  {shippingProduct && (
                    <>
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
                          <MenuItem
                            value={item.StudentAddressId}
                            key={index}
                          >
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
                      {loading && shippingProduct && address && (
                        <CircularProgress color="inherit" size={20} />
                      )}
                      {!loading && shippingProduct && address && (
                        <>
                          <FormControl sx={{ mb: 2 }}>
                            <FormLabel id="demo-radio-buttons-group-label">
                              <Span color="grey.600">Tipo de entrega</Span>
                            </FormLabel>
                            {shippingInfo?.map((carriers, index) => (
                              <>
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
                              </>
                            ))}
                          </FormControl>
                        </>
                      )}
                    </>
                  )}

                  <Button
                    onClick={
                      getTotalPrice() > 0
                        ? handleCheckout
                        : handlePaymentFree
                    }
                    disabled={
                      (!address && shippingProduct) ||
                      (!radioValue && shippingProduct)
                    }
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
