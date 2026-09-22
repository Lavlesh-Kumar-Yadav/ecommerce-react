import { useContext } from "react";
import { CartContext } from "../context/CartContext";
function Cart () {
const {cart,removeFromCart,increaseQuantity,decreaseQuantity}= useContext(CartContext);
  return(
    
    <div className="cart">
      <h1>My Shopping Cart</h1>
      {cart.length===0 ? ( <p>Your Cart is Empty</p>): (  cart.map((item)=>(
        <div key={item.id} className="cart-item">
          <h2>{item.name}</h2>
          <p>₹{item.price}</p>
          <p>Subtotal: ₹{item.price* item.quantity}</p>
          <button className="quantity-button" onClick={()=>decreaseQuantity(item.id)}>-</button>
          <p className="quantity">{item.quantity}</p>
          
           <button  className="quantity-button" onClick={()=>increaseQuantity(item.id)}>+</button>
          
<button className="remove-button" onClick={()=>removeFromCart(item.id)}>Remove</button>

        </div>
      )))}
       
      
    
     {cart.length>0 && ( <p className="cart-total">Total: ₹{cart.reduce((total, item) => total + item.price* item.quantity, 0)}</p>)}
    </div>
    
  )
}

export default Cart;