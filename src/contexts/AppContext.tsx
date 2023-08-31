import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

// =================================================================================
type InitialState = { cart: CartItem[] };

export type CartItem = {
  URLKey: string;
  ShortDescription?: string;
  qty: number;
  name: string;
  // slug: string;
  price: number;
  imgUrl?: string;
  ProductId: string | number;
};

type CartActionType = { type: "CHANGE_CART_AMOUNT"; payload: CartItem };
type ActionType = CartActionType;

// =================================================================================

const INITIAL_CART = [];

const INITIAL_STATE = { cart: INITIAL_CART };

interface ContextProps {
  state: InitialState;
  dispatch: (args: ActionType) => void;
}

const AppContext = createContext<ContextProps>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find(
        (item) => item.ProductId === cartItem.ProductId
      );

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter(
          (item) => item.ProductId !== cartItem.ProductId
        );
        return { ...state, cart: filteredCart };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.ProductId === cartItem.ProductId
            ? { ...item, qty: cartItem.qty }
            : item
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    default: {
      return state;
    }
  }
};

// =======================================================
type AppProviderProps = { children: ReactNode };
// =======================================================

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const contextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;
