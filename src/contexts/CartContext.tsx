import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState<any>();

  const { data: session } = useSession();

  const fetchCartItems = useCallback(async () => {
    if (localProducts) {
      try {
        const response = await axios.get(
          `https://apiecommerce.meucurso.com.br/BIPEStore/GetOrderDetails?OrderId=${localProducts?.OrderId}`,
          { headers: { Authorization: `Bearer ${session?.user?.Token}` } }
        );

        const processedData = response.data.Items.map((item) => {
          if (item.OrderItemProductLevelId === 1) {
            const matchingItem = response.data.Items.find(
              (otherItem) =>
                otherItem.ParentOrderItemId === item.OrderItemId
            );
            if (matchingItem) {
              if (matchingItem.ProductGroupId === 3) {
                item.Price = matchingItem.Price;
              } else if (matchingItem.ProductGroupId === 2) {
                item.Price += matchingItem.Price;
              }
            }
          }
          return item;
        });

        setCartProducts(
          processedData.filter(
            (item) => item.OrderItemProductLevelId === 1
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [localProducts, session]);

  useEffect(() => {
    if (session) {
      fetchCartItems();
    }
  }, [fetchCartItems, session, setCartProducts]);

  const contextValue = useMemo(
    () => ({
      cartProducts,
      setCartProducts,
      fetchCartItems,
      localProducts,
      setLocalProducts,
    }),
    [
      cartProducts,
      setCartProducts,
      fetchCartItems,
      localProducts,
      setLocalProducts,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
