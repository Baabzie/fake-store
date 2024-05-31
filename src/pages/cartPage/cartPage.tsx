import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/configureStore";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/redux/cartSlice";
import { ItemI } from "@/interfaces/ItemI";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddItem = (item: ItemI) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(({ item, quantity }) => (
          <li key={item.id}>
            {item.title} - {quantity}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <button onClick={() => handleUpdateQuantity(item.id, quantity + 1)}>
              +
            </button>
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
