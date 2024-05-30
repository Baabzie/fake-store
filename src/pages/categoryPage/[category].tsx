import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";

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
  }, [category]);

  // For testing only
  useEffect(() => {
    console.log(items);
  }, [items]);

  const capitalizeFirstLetter = (string: string): string => {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return <h2>{capitalizeFirstLetter(categoryStr)}</h2>;
};

export default CategoryPage;
