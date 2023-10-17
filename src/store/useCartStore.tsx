import axios from "axios";
import { create } from "zustand";

const useCartStore = create((set) => ({
  cartProducts: [],
  setCartProducts: (newCartProducts) =>
    set({ cartProducts: newCartProducts }),
  fetchCartItems: async (session) => {
    if (session) {
      try {
        const cartData = JSON.parse(
          localStorage.getItem("apiResponseData")
        );
        const response = await axios.get(
          `https://apiecommerce.meucurso.com.br/BIPEStore/GetOrderDetails?OrderId=${cartData?.OrderId}`,
          { headers: { Authorization: `Bearer ${session.user.Token}` } }
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

        set({
          cartProducts: processedData.filter(
            (item) => item.OrderItemProductLevelId === 1
          ),
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
}));

export default useCartStore;
