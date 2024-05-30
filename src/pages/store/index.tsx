import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";
import ItemCarousel from "@/components/itemCarousel/ItemCarousel";

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

  return (
    <>
      <ItemCarousel items={items} />
    </>
  );
};

export default Store;
