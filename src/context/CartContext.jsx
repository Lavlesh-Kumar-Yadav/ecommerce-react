import { createContext, useReducer } from "react";

const CartContext = createContext();
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.find(
        (item) => item.id === action.product.id,
      );
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }

    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.productID);
    }
    case "INCREASE_QUANTITY": {
      return state.map((item) =>
        item.id === action.productID
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }
    case "DECREASE_QUANTITY": {
      return state
        .map((item) =>
          item.id === action.productID
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      product: product,
    });
  };


const removeFromCart = (productID) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    productID: productID,
  });
};

const increaseQuantity = (productID) => {
  dispatch({
    type: "INCREASE_QUANTITY",
    productID: productID,
  });
};
const decreaseQuantity = (productID) => {
  dispatch({
    type: "DECREASE_QUANTITY",
    productID: productID,
  });
};


return (
  <CartContext.Provider
    value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
    }}
  
  >
    {children}
  </CartContext.Provider>
);
}
export { CartProvider, CartContext };
