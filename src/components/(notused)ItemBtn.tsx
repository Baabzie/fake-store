import React from "react";
import { ItemI } from "@/interfaces/ItemI";
import styles from "./ItemBtn.module.scss";

interface ItemBtnProps {
  item: ItemI;
}

const ItemBtn: React.FC<ItemBtnProps> = ({ item }) => {
  return (
    <button className={styles["item-btn"]}>
      <div className={styles["img-div"]}>
        <img src={item.image} alt={item.title} width="50" />
      </div>
      <div className={styles["text-div"]}>
        {/* <p>{item.title}</p> */}
        <p>${item.price}</p>
      </div>
      {/* <div>
        Rating: {item.rating.rate} ({item.rating.count} reviews)
      </div>
      <div>{item.category}</div>
      <p>{item.description}</p> */}
    </button>
  );
};

export default ItemBtn;
