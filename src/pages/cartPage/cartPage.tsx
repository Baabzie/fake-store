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
            <div className={styles["row"]}>
              <div className={styles["left"]}>
                <div className={styles["img-wrapper"]}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                </div>
              </div>
              <div className={styles["right"]}>
                <button
                  className={styles["remove-button"]}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className={styles["minus-button"]}
              onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              // className={styles.quantityInput}
            />
            <button
              className={styles["plus-button"]}
              onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
            >
              +
            </button>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 ? (
        <button className={styles["clear-button"]} onClick={handleClearCart}>
          Clear Cart
        </button>
      ) : (
        <p>You don't have any items in your cart.</p>
      )}
    </div>
  );
};

export default CartPage;
