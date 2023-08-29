import { FC } from "react";
import { Button, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { FlexBetween } from "components/flex-box";
import { Paragraph } from "components/Typography";

// styled component
const StyledBox = styled(FlexBetween)(({ theme }) => ({
  ".title": {
    fontSize: 50,
    marginTop: 0,
    lineHeight: 1.2,
    marginBottom: "1.35rem",
  },
  [theme.breakpoints.up("sm")]: {
    ".grid-item": {
      minHeight: 424,
      display: "flex",
      alignItems: "baseline",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    paddingLeft: 0,
    ".title": { fontSize: 32 },
  },
  [theme.breakpoints.down("xs")]: {
    ".title": { fontSize: 16 },
    ".title + *": { fontSize: 13 },
    ".button-link": { height: 36, padding: "0 1.5rem", fontSize: 13 },
  },
}));

// ==================================================
type CarouselCard1Props = {
  title?: string;
  imgUrl?: string;
  imgUrlMobile?: string;
  buttonLik?: string;
  buttonText?: string;
  description?: string;
  buttonColor?: "dark" | "primary";
};
// ==================================================

const CarouselCard1: FC<CarouselCard1Props> = ({
  title,
  imgUrl,
  imgUrlMobile,
  buttonLik,
  buttonText,
  description,
  buttonColor = "primary",
}) => {
  return (
    <StyledBox>
      <BazaarImage
        src={imgUrlMobile}
        alt="apple-watch-1"
        sx={{
          mx: "auto",
          maxHeight: "auto",
          display: { xs: "block", md: "none" },
          width: "100%",
        }}
      />
      <BazaarImage
        src={imgUrl}
        alt="apple-watch-1"
        sx={{
          mx: "auto",
          maxHeight: "auto",
          display: { xs: "none", md: "block" },
          width: "100%",
        }}
      />
    </StyledBox>
  );
};

export default CarouselCard1;
