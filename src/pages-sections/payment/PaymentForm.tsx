import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";

const PaymentForm: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [localProducts, setLocalProducts] = useState<any>([]);

  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;

  const fetchLocalItems = async () => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  };

  const handleFormSubmit = async (values: any) => {
    const Card = {
      Number: values.card_no,
      HolderName: values.name,
      CPF: values.cpf,
      Brand: values.brand,
      ExpMonth: values.month_exp_date,
      ExpYear: values.year_exp_date,
      qtyInstallment: values.installment,
      StudendId: localProducts.StudentId,
      PaymentMethodId: 2,
    };
    console.log(Card);
  };

  const handlePaymentMethodChange = ({ target: { name } }: any) => {
    setPaymentMethod(name);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: checkoutSchema,
  });

  useEffect(() => {
    fetchLocalItems();
  }, []);

  return (
    <Fragment>
      <Card1 sx={{ mb: 4 }}>
        <FormControlLabel
          sx={{ mb: 3 }}
          name="credit-card"
          onChange={handlePaymentMethodChange}
          label={
            <Paragraph fontWeight={600}>
              Pagamento com cartão de crédito
            </Paragraph>
          }
          control={
            <Radio
              checked={paymentMethod === "credit-card"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider sx={{ mb: 3, mx: -4 }} />

        {paymentMethod === "credit-card" && (
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="card_no"
                    label="Número do cartão"
                    onBlur={handleBlur}
                    value={values.card_no}
                    onChange={handleChange}
                    helperText={
                      (touched.card_no && errors.card_no) as string
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="month_exp_date"
                    label="Mês de expiração"
                    placeholder="MM/YY"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.month_exp_date}
                    helperText={
                      (touched.month_exp_date &&
                        errors.month_exp_date) as string
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="year_exp_date"
                    label="Ano de expiração"
                    placeholder="MM/YY"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.year_exp_date}
                    helperText={
                      (touched.year_exp_date &&
                        errors.year_exp_date) as string
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    onBlur={handleBlur}
                    value={values.name}
                    label="Nome no cartão"
                    onChange={handleChange}
                    helperText={(touched.name && errors.name) as string}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="cpf"
                    onBlur={handleBlur}
                    value={values.cpf}
                    label="CPF"
                    onChange={handleChange}
                    helperText={(touched.cpf && errors.cpf) as string}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="cvc"
                    onBlur={handleBlur}
                    value={values.cvc}
                    label="CVC"
                    onChange={handleChange}
                    helperText={(touched.cvc && errors.cvc) as string}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    disabled
                    sx={{
                      color: "#2b3445",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#2b3445",
                      },
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "#2b3445",
                      },
                    }}
                    fullWidth
                    name="brand"
                    onBlur={handleBlur}
                    value={
                      values.card_no.startsWith("4")
                        ? "VISA"
                        : values.card_no.startsWith("5")
                        ? "MasterCard"
                        : values.card_no.startsWith("3")
                        ? "American Express"
                        : "Outro"
                    }
                    label="Bandeira"
                    onChange={handleChange}
                    helperText={(touched.brand && errors.brand) as string}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="installment"
                    onBlur={handleBlur}
                    value={values.installment}
                    label="Parcelas"
                    onChange={handleChange}
                    helperText={
                      (touched.installment && errors.installment) as string
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mb: 4 }}
            >
              Enviar
            </Button>

            <Divider sx={{ mb: 3, mx: -4 }} />
          </form>
        )}

        <FormControlLabel
          name="paypal"
          sx={{ mb: 3 }}
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pagamento via PIX</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "paypal"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider sx={{ mb: 3, mx: -4 }} />

        {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb={4}>
              <TextField
                fullWidth
                name="email"
                type="email"
                label="Email do PayPal"
                sx={{ mr: isMobile ? "1rem" : "30px" }}
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>
          </Fragment>
        )}
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            href="/cart"
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
          >
            Voltar para o Carrinho
          </Button>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            LinkComponent={Link}
            variant="contained"
            color="primary"
            href="/orders"
            type="submit"
            fullWidth
          >
            Finalizar Compra
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  month_exp_date: "",
  year_exp_date: "",
  cvc: "",
  cpf: "",
  brand: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  month_exp_date: yup.string().required("required"),
  year_exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"),
  cpf: yup.string().required("required"),
  brand: yup.string().required("required"),
});

export default PaymentForm;
