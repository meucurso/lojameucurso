import { FC } from "react";
import { Divider } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { currency } from "lib";
import { useState, useCallback, useEffect } from "react";

const PaymentSummary: FC = () => {
  const [localProducts, setLocalProducts] = useState<any>([]);

  const fetchLocalItems = useCallback(() => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  }, []);

  useEffect(() => {
    fetchLocalItems();
  }, [fetchLocalItems]);

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(localProducts.SubTotalPrice)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Frete:</Paragraph>
        <Paragraph
          color={"#D23F57"}
          fontSize={18}
          fontWeight={600}
          lineHeight={1}
        >
          {currency(localProducts.Frete)}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Cupom:</Paragraph>
        <Paragraph
          color={"green"}
          fontSize={18}
          fontWeight={600}
          lineHeight={1}
        >
          - {currency(localProducts.Cupom)}
        </Paragraph>
      </FlexBetween>

      <Divider sx={{ mb: 2 }} />
      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Total:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(localProducts.Price)}
        </Paragraph>
      </FlexBetween>
    </Card1>
  );
};

export default PaymentSummary;
