import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";
import ItemBtn from "@/components/ItemBtn";
import ItemCarousel from "@/components/ItemCarousel";

const Store: React.FC = () => {
  const [items, setItems] = useState<ItemI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ItemI[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      {/* <div className={styles["products-div"]}>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <ItemBtn item={item} />
            </li>
          ))}
        </ul>
      </div> */}
      <ItemCarousel items={items} />
    </>
  );
};

export default Store;
