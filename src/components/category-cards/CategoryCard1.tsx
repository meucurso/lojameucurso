import { FC } from "react";
import { H4 } from "components/Typography";
import { Box, styled } from "@mui/material";
import LazyImage from "components/LazyImage";

// custom styled components
const Wrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "4px",
  "& img": { transition: "all 0.3s" },
  ":hover": {
    img: { transform: "scale(1.1)" },
    "& .category-title": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.dark.main,
    },
  },
}));

const CategoryTitle = styled(Box)({
  left: 10,
  right: 10,
  bottom: 10,
  padding: 8,
  textAlign: "center",
  borderRadius: "2px",
  position: "absolute",
  transition: "all 0.3s",
  color: "transparent",
  // backgroundColor: "rgba(255,255,255, .67)",
});

// ============================================================
type CategoryCard1Props = {
  image: string;
  title: string;
  imageMobile: string;
};
// ============================================================

const CategoryCard1: FC<CategoryCard1Props> = ({
  image,
  title,
  imageMobile,
}) => {
  return (
    <Wrapper position="relative">
      <LazyImage
        src={image}
        width={213}
        height={213}
        priority={true}
        alt="category"
        sx={{
          width: "100%",
          aspectRatio: "3/2",
          objectFit: "cover",
          objectPosition: "center center",
          display: { xs: "none", md: "block" },
        }}
      />
      <LazyImage
        src={imageMobile}
        width={213}
        height={213}
        priority={true}
        alt="category"
        sx={{
          display: { xs: "block", md: "none" },
        }}
      />

      <CategoryTitle className="category-title">
        <H4>{title}</H4>
      </CategoryTitle>
    </Wrapper>
  );
};

export default CategoryCard1;
