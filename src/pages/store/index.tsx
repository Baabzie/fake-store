import React from "react";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";
import ItemCarousel from "@/components/itemCarousel/ItemCarousel";
import ImageLink from "@/components/imageLink/ImageLink";

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
      <ImageLink
        category="men's clothing"
        image="male"
        alt="image of well dressed man"
        text="New fashion for men"
      />
      <ImageLink
        category="women's clothing"
        image="female"
        alt="image of well dressed woman"
        text="Latest fashion for women"
      />
    </>
  );
};

export default Store;
