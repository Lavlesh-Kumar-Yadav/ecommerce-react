import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    
    const existingProduct=cart.find((item)=>item.id===product.id)
    if(existingProduct){
      setCart(
        cart.map((item)=>item.id===product.id ? {...item, quantity: item.quantity +1} :item)
      )
    }
    else{
      setCart([...cart,{...product, quantity:1}])
    }
  };

  const removeFromCart=(productID) => {
    setCart(cart.filter((item) => item.id !==productID))

  }

  const increaseQuantity=(productID)=>{
setCart(
  cart.map((item)=> item.id===productID ? {...item, quantity : item.quantity +1}:item)
)
  }
  const decreaseQuantity= (productID)=>{
    setCart(
      cart.map((item)=>item.id ===productID ? {...item, quantity: item.quantity-1}:item )
      .filter((item) => item.quantity > 0)
    )
          
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };