import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const useBanners = (dataBanners) => {
  const [banners, setBanners] = useState<any>([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBanners = async () => {
      await dataBanners
        .then((response) => setBanners(response))
        .catch((err) =>
          enqueueSnackbar(err.response.data, {
            variant: "error",
          })
        );
    };

    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { banners, setBanners };
};
