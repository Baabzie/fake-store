import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/configureStore";
import { removeItem, updateQuantity, clearCart } from "@/redux/cartSlice";
import styles from "./cartPage.module.scss";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleQuantityChange = (id: number, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className={styles["cart-page-div"]}>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(({ item, quantity }) => (
          <li key={item.id}>
            {item.title} - {quantity}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <button onClick={() => handleUpdateQuantity(item.id, quantity + 1)}>
              +
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              // className={styles.quantityInput}
            />
            <button onClick={() => handleUpdateQuantity(item.id, quantity - 1)}>
              -
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
