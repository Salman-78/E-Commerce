/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import React, { useContext } from "react";
// import "./CartItem.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";

// const CartItem = () => {
//   const { all_product, CartItem, removeFromCart } = useContext(ShopContext);
//   return (
//     <div className="cartitem">
//       <div className="cartitem-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (CartItem[e.id] > 0) {
//           return (
//             <div>
//               <div className="cartitem-format">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p>{e.new_price}</p>
//                 <button className="cartitem-quantity">{CartItem[e.id]}</button>
//                 <p>{e.new_price * CartItem[e.id]}</p>
//                 <img
//                   src={remove_icon}
//                   onClick={() => {
//                     removeFromCart(e.id);
//                   }}
//                   alt=""
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//       })}
//     </div>
//   );
// };

// export default CartItem;

import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItem = () => {
  const { all_product, cartItem, removeFromCart, getTotalCartAmout } = useContext(ShopContext);

  if (!all_product || !cartItem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        const quantity = cartItem[e.id] || 0;
        if (quantity > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format">
                <img
                  src={e.image}
                  alt={e.name}
                  className="carticons-product-icon"
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{quantity}</button>
                <p>${e.new_price * quantity}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total Carts</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmout()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmout()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code"/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
