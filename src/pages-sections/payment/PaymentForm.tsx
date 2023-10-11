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
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { currency } from "lib";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingButton } from "@mui/lab";

const PaymentForm: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [localProducts, setLocalProducts] = useState<any>([]);
  const [paymentInstallments, setPaymentInstallments] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentSucceeded, setPaymentSucceed] = useState<any>();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    router.push("/");
  };

  const { enqueueSnackbar } = useSnackbar();

  const { data: session } = useSession();

  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;

  const fetchLocalItems = useCallback(() => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  }, []);

  const fetchInstallments = useCallback(async () => {
    const cartData = JSON.parse(localStorage.getItem("apiResponseData"));
    try {
      const response = await axios.get(
        `https://apiecommerce.meucurso.com.br/BIPEStore/ListInstallments?OrderId=${cartData.OrderId}&Coupon=${cartData.Coupon}&PaymentOperatorId=9&PaymentMethodId=2&StudentAddressId=${session.user.StudentAddress[0].StudentAddressId}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      );

      setPaymentInstallments(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [session, setPaymentInstallments]);

  const handleFormSubmit = async (values: any) => {
    setLoadingPayment(true);
    const Card = {
      Number: values.card_no,
      HolderName: values.name,
      CPF: values.cpf,
      CVV: values.cvc,
      ExpMonth: values.month_exp_date,
      ExpYear: values.year_exp_date,
      qtyInstallment: values.installment,
      StudendId: localProducts.StudentId,
      PaymentMethodId: 2,
    };

    const requestPayment = {
      BillingAddressId: 267951,

      Card: Card,

      OrderId: localProducts.OrderId,

      ShippingAddressId: 267951,

      OrderShippingPackage: localProducts.OrderShippingPackages,

      Coupon: localProducts.Coupon,
    };

    await axios
      .post(
        "https://apiecommerce.meucurso.com.br/BIPEStore/ProcessPaymentBrainTree",

        requestPayment,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then((response) => {
        setLoadingPayment(false),
          setPaymentSucceed(response.data),
          localStorage.removeItem("apiResponseData"),
          setOpen(true);
      })
      .catch((err) => {
        setLoadingPayment(false),
          enqueueSnackbar(err.response.data, {
            variant: "error",
          });
      });
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
    if (session) {
      fetchInstallments();
    }
  }, [fetchInstallments, fetchLocalItems, session]);

  const formatCardNumber = (inputValue) => {
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 16);

    const formattedWithSpaces = formattedValue
      .replace(/(\d{4})/g, "$1 ")
      .trim();

    handleChange({
      target: { name: "card_no", value: formattedWithSpaces },
    });
  };

  const formatMonthExpiration = (inputValue) => {
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 2);
    handleChange({
      target: { name: "month_exp_date", value: formattedValue },
    });
  };

  const formatYearExpiration = (inputValue) => {
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 4);
    handleChange({
      target: { name: "year_exp_date", value: formattedValue },
    });
  };

  const formatCVC = (inputValue) => {
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 3);
    handleChange({ target: { name: "cvc", value: formattedValue } });
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 80,
    p: 10,
  };

  return (
    <Fragment>
      <div>
        <Button onClick={handleOpenModal}>Open modal</Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CheckCircleIcon
              color="success"
              sx={{
                fontSize: 75,
                textAlign: "center",
                margin: "0 auto",
                display: "flex",
              }}
            />
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mt: 5 }}
            >
              Compra Finalizada com Sucesso!
            </Typography>
            <Typography
              textAlign={"center"}
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mt: 3 }}
            >
              Ordem:#{paymentSucceeded?.OrderId}
            </Typography>

            <Typography
              fontSize={20}
              textAlign={"center"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
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
            </Typography>
            <Typography
              textAlign={"center"}
              fontSize={15}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Ou veja mais informações de sua compra clicando{" "}
              <a
                target="_blank"
                style={{ color: "green", textDecoration: "underline" }}
                href="https://aluno.meucurso.com.br/BIPEStore/Orders"
              >
                aqui
              </a>
            </Typography>
            <Button
              color="success"
              variant="contained"
              sx={{ marginTop: 5, color: "white" }}
              fullWidth
              onClick={handleCloseModal}
            >
              Volta para a Tela Inicial
            </Button>
          </Box>
        </Modal>
      </div>
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
                    onChange={(e) => formatCardNumber(e.target.value)}
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
                    placeholder="MM"
                    onBlur={handleBlur}
                    onChange={(e) => formatMonthExpiration(e.target.value)}
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
                    placeholder="AAAA"
                    onBlur={handleBlur}
                    onChange={(e) => formatYearExpiration(e.target.value)}
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
                    label="CVV"
                    onChange={(e) => formatCVC(e.target.value)}
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
                    select
                    fullWidth
                    name="installment"
                    onBlur={handleBlur}
                    value={values.installment}
                    label="Parcelas"
                    onChange={handleChange}
                    helperText={
                      (touched.installment && errors.installment) as string
                    }
                  >
                    {paymentInstallments.map((intellments, index) => (
                      <MenuItem value={intellments.Number} key={index}>
                        {intellments.Number}x de{" "}
                        {currency(intellments.Tatal)} sem juros
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            {/* <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mb: 4 }}
            >
              Enviar
            </Button> */}
            {/* <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Finalizar Compra
            </Button> */}
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              loading={loadingPayment}
            >
              Finalizar Compra
            </LoadingButton>

            <Divider sx={{ mb: 3, mx: -4 }} />
          </form>
        )}

        {/* <FormControlLabel
          name="pix"
          sx={{ mb: 3 }}
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pagamento via PIX</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "pix"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider sx={{ mb: 3, mx: -4 }} />

        {paymentMethod === "pix" && (
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
        )} */}
      </Card1>

      {/* <Grid container spacing={7}>
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
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Finalizar Compra
          </Button>
        </Grid>
      </Grid> */}
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
  installment: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("Digite o número do seu cartão"),
  name: yup.string().required("Coloque o nome que está escrito no cartão"),
  month_exp_date: yup
    .string()
    .required("Digite o mês de expiração")
    .matches(/^(0[1-9]|1[0-2])$/, "Mês de expiração inválido (01-12)"),
  year_exp_date: yup
    .string()
    .required("Digite o ano de expiração")
    .matches(/^\d{4}$/, "Ano de expiração inválido (4 dígitos)"),
  cvc: yup
    .string()
    .required("Digite o CVC do cartão")
    .matches(/^\d{1,3}$/, "CVC inválido (até 3 dígitos)"),
  cpf: yup.string().required("Digite seu CPF"),
  brand: yup.string(),
  installment: yup.number(),
});

export default PaymentForm;
