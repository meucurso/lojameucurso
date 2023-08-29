import BazaarImage from "components/BazaarImage";
import MainCarouselItem from "models/Market-1.model";

type Props = { bannerData?: MainCarouselItem[] };

const ResponsiveBanners = ({ bannerData }: Props) => {
  return (
    <>
      {bannerData?.map((item, index) => (
        <div key={index}>
          <BazaarImage
            src={item.imgUrl}
            sx={{
              display: { xs: "none", md: "block" },
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <BazaarImage
            src={item.imgUrlMobile}
            sx={{
              display: { xs: "block", md: "none" },

              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default ResponsiveBanners;
