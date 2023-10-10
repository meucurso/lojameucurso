import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartProducts?: any;
  loading?: boolean;
  localProducts?: any;
  handleDeleteCartItems?: any;
  fetchCartItems?: any;
  fetchLocalItems?: any;
}

export const CartContext = createContext<CartContextType | undefined>({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [localProducts, setLocalProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchLocalItems = () => {
    const response = JSON.parse(localStorage.getItem("apiResponseData"));
    setLocalProducts(response);
  };

  const fetchCartItems = async () => {
    if (session) {
      setLoading(true);
      const cartData = JSON.parse(localStorage.getItem("apiResponseData"));
      await axios
        .get(
          `https://apiecommerce.meucurso.com.br/BIPEStore/GetOrderDetails?OrderId=${cartData?.OrderId}&StoreId=${cartData.StoreId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        )
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setCartProducts(
            response.data.Items.filter(
              (item) => item.OrderItemProductLevelId === 1
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteCartItems = (OrderId, StoreId, SKU) => {
    axios
      .delete(
        `https://apiecommerce.meucurso.com.br/BIPEStore/DeleteFromCart?OrderId=${OrderId}&StoreId=${StoreId}&SKU=${SKU}`,
        { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
      )
      .then(() => {
        setCartProducts((prev) =>
          prev.filter((product) => product.SKU !== SKU)
        );
      });
  };
  useEffect(() => {
    fetchCartItems();
    fetchLocalItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        loading,
        localProducts,
        handleDeleteCartItems,
        fetchCartItems,
        fetchLocalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
