import BazaarImage from "components/BazaarImage";

const ResponsiveBanners = ({ bannerData }: any) => {
  return (
    <>
      <BazaarImage
        src={bannerData}
        sx={{
          display: { xs: "none", md: "block" },
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </>
  );
};

export default ResponsiveBanners;
