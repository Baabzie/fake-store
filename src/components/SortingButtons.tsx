import { ItemI } from "@/interfaces/ItemI";
import { useState, useEffect } from "react";
import styles from "./SortingButtons.module.scss";

interface SortingButtonsProps {
  items: ItemI[];
}

const SortingButtons: React.FC<SortingButtonsProps> = ({ items }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const newCategoriesSet = new Set<string>();
    items.forEach((item) => {
      newCategoriesSet.add(item.category);
    });

    const uniqueCategoriesArray = Array.from(newCategoriesSet);
    setCategories(uniqueCategoriesArray);
    console.log(uniqueCategoriesArray);
  }, [items]);

  return (
    <div className={styles["sorting-button-div"]}>
      <button>All</button>
      {categories.map((category: string, index) => {
        return (
          <button key={index}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default SortingButtons;
