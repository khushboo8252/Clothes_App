import { createContext, useReducer } from "react";

// ✅ Create Store Context
const StoreContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// ✅ Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      return { ...state, user: null, cart: [] };

    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };

    case "CLEAR_CART": // ✅ Clear cart after successful payment
      localStorage.removeItem("cart");
      return { ...state, cart: [] };

    default:
      return state;
  }
};

// ✅ Store Provider Component
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// ✅ Ensure both exports are correct
export { StoreContext, StoreProvider };
