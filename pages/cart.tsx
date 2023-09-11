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

const Cart: NextPage = () => {
  const { state } = useAppContext();
  const cartList: any = state.cart;

  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  return (
    <CheckoutNavLayout>
      <SEO title="Carrinho" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {cartList.map((item) => (
            <ProductCard7 key={item.ProductId} {...item} />
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

            {/* <FlexBox alignItems="center" columnGap={1} mb={2}>
              <Span fontWeight="600">Additional Comments</Span>

              <Span
                p="6px 10px"
                fontSize={12}
                lineHeight="1"
                borderRadius="3px"
                color="primary.main"
                bgcolor="primary.light"
              >
                Note
              </Span>
            </FlexBox> */}

            {/* <TextField
              variant="outlined"
              rows={6}
              fullWidth
              multiline
              sx={{ mb: 2 }}
            /> */}

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
            {/* 
            <Autocomplete
              fullWidth
              sx={{ mb: 2 }}
              options={countryList}
              // getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Country"
                  variant="outlined"
                  placeholder="Select Country"
                />
              )}
            />

            <TextField
              select
              fullWidth
              size="small"
              label="State"
              variant="outlined"
              placeholder="Select State"
              defaultValue="new-york"
            >
              {stateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField> */}

            <TextField
              fullWidth
              size="small"
              label="C.E.P"
              placeholder="3100"
              variant="outlined"
              sx={{ mt: 2 }}
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
  );
};

const stateList = [
  { value: "new-york", label: "New York" },
  { value: "chicago", label: "Chicago" },
];

export default Cart;
