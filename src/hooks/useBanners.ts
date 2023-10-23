import { useEffect, useState } from "react";

export const useBanners = (dataBanners) => {
  const [banners, setBanners] = useState<any>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      await dataBanners
        .then((response) => setBanners(response))
        .catch((err) => console.log(err));
    };

    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { banners, setBanners };
};
