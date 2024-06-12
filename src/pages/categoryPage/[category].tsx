import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";
import styles from "./CategoryPage.module.scss";
import Link from "next/link";

const CategoryPage: React.FC = () => {
  const [items, setItems] = useState<ItemI[]>([]);
  const router = useRouter();
  const { category } = router.query;

  // Ensure category is a string and provide a fallback in case it's undefined.
  const categoryStr = Array.isArray(category) ? category[0] : category || "";
  const categoryUrlEncoded = encodeURIComponent(categoryStr);

  // NOTE TO SELF: Not 100% sure about "category" in the dependecy array.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${categoryUrlEncoded}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, [category, categoryUrlEncoded]);

  const capitalizeFirstLetter = (string: string): string => {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles["category-page-div"]}>
      <div>
        <h2>{capitalizeFirstLetter(categoryStr)}</h2>
      </div>
      <ul className={styles["item-list"]}>
        {items.map((item, i) => {
          return (
            <li key={i}>
              <Link href={`/store/${item.id}`} className={styles["item-btn"]}>
                <div className={styles["img-div"]}>
                  <img src={item.image} alt={item.title} width="50" />
                </div>
                <div className={styles["text-div"]}>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryPage;
