import Link from "next/link";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { CartItem, useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

import ShopLayout1 from "components/layouts/ShopLayout1";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const LinkHelper = styled(Link)({
  transition: "0.2s",
  "&:hover": {
    color: "#E3364E",
  },
});

const Cart: NextPage = () => {
  const { state } = useAppContext();
  const { data: session } = useSession();
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const theme = useTheme();

  const cartList: any = state.cart;

  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

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

  console.log(cartList);

  return (
    <>
      {!cartList.length && (
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
              <Grid item md={8} xs={12}>
                {cartList.map((item) => (
                  <>
                    <ProductCard7 key={item.ProductId} {...item} />
                  </>
                ))}
              </Grid>

              {/* CHECKOUT FORM */}
              <Grid item md={4} xs={12}>
                <Card sx={{ padding: 3 }}>
                  <FlexBetween mb={2}>
                    <Span color="grey.600">Subtotal:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
                      {currency(getTotalPrice())}
                    </Span>
                  </FlexBetween>
                  <FlexBetween mb={2}>
                    <Span color="grey.600">Cupom:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
                      {currency(getTotalPrice())}
                    </Span>
                  </FlexBetween>
                  <FlexBetween mb={2}>
                    <Span color="grey.600">Frete:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
                      {currency(getTotalPrice())}
                    </Span>
                  </FlexBetween>
                  <FlexBetween mb={2}>
                    <Span color="grey.600">Total:</Span>

                    <Span fontSize={18} fontWeight={600} lineHeight="1">
                      {currency(getTotalPrice())}
                    </Span>
                  </FlexBetween>

                  <Divider sx={{ mb: 2 }} />

                  <TextField
                    fullWidth
                    size="small"
                    label="Cupom"
                    variant="outlined"
                    placeholder="Cupom"
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 4 }}
                  >
                    Aplicar Cupom
                  </Button>

                  <Divider sx={{ mb: 2 }} />

                  {/* <Span fontWeight={600} mb={0} display="block">
              Frete
            </Span> */}

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
                    placeholder="Selecione seu endereço"
                    onChange={handleAddressChange}
                  >
                    {session.user.StudentAddress.map((item) => (
                      <MenuItem
                        value={item.StudentAddressId}
                        key={item.StudentAddressId}
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

                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ my: 2 }}
                  >
                    Calcular frete
                  </Button>
                  <Button
                    disabled={address.length === 0 && cep.length === 0}
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
  );
};

const stateList = [
  { value: "new-york", label: "New York" },
  { value: "chicago", label: "Chicago" },
];

export default Cart;
