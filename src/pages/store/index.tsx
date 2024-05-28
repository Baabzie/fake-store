import React from "react";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";

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
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.image} alt={item.title} width="50" />
          <div>
            {item.title} - ${item.price}
          </div>
          <div>
            Rating: {item.rating.rate} ({item.rating.count} reviews)
          </div>
          <div>{item.category}</div>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Store;
