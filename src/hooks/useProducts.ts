import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export const useProducts = (dataProducts) => {
  const [products, setProducts] = useState<any>([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      await dataProducts
        .then((response) => setProducts(response))
        .catch((err) =>
          enqueueSnackbar(err.response.data, {
            variant: "error",
          })
        );
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, setProducts };
};
