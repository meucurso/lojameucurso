import { FC } from "react";
import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
import MainCarouselItem from "models/Market-1.model";
import Link from "next/link";

// ======================================================
type Props = { carouselData?: MainCarouselItem[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData }) => {
  return (
    <Box mb={7.5}>
      {carouselData.length > 1 && (
        <Container disableGutters={true} maxWidth="xl">
          <Carousel
            spacing="0px"
            totalSlides={carouselData.length}
            showDots={true}
            autoPlay={true}
            visibleSlides={1}
            showArrow={false}
            interval={6000}
            dotColor="black"
          >
            {carouselData
              ?.sort((a, b) => (a.Order > b.Order ? 1 : -1))
              .map((item, ind) => (
                <a key={ind} href={item?.URL}>
                  <CarouselCard1
                    buttonColor="dark"
                    title={item.title}
                    imgUrl={item.BannerLargeURL}
                    imgUrlMobile={item.BannerSmallURL}
                    buttonLik={item.buttonLik}
                    buttonText={item.buttonText}
                    description={item.description}
                    alt={item.title}
                  />
                </a>
              ))}
          </Carousel>
        </Container>
      )}
      {carouselData.length <= 1 && (
        <Container disableGutters={true} maxWidth="xl">
          <Carousel
            spacing="0px"
            totalSlides={1}
            showDots={false}
            autoPlay={true}
            visibleSlides={1}
            showArrow={false}
            interval={6000}
            dotColor="black"
          >
            {carouselData
              ?.sort((a, b) => (a.Order > b.Order ? 1 : -1))
              .map((item, ind) => (
                <a key={ind} href={item?.URL}>
                  <CarouselCard1
                    buttonColor="dark"
                    title={item.title}
                    imgUrl={item.BannerLargeURL}
                    imgUrlMobile={item.BannerSmallURL}
                    buttonLik={item.buttonLik}
                    buttonText={item.buttonText}
                    description={item.description}
                    alt={item.title}
                  />
                </a>
              ))}
          </Carousel>
        </Container>
      )}
    </Box>
  );
};

export default Section1;
