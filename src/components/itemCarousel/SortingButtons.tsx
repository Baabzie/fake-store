import { ItemI } from "@/interfaces/ItemI";
import { useState, useEffect } from "react";
import styles from "./SortingButtons.module.scss";

interface SortingButtonsProps {
  items: ItemI[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const capitalizeFirstLetter = (string: string): string => {
  if (string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SortingButtons: React.FC<SortingButtonsProps> = ({
  items,
  activeCategory,
  setActiveCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategoriesArray = Array.from(
      new Set(items.map((item) => item.category))
    );
    setCategories(uniqueCategoriesArray);
    console.log(uniqueCategoriesArray);
  }, [items]);

  const handleCategoryClick = (category: string): void => {
    setActiveCategory(category);
  };

  return (
    <div className={styles["sorting-button-div"]}>
      <button
        onClick={() => handleCategoryClick("All")}
        className={activeCategory === "All" ? styles["active-btn"] : ""}
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className={activeCategory === category ? styles["active-btn"] : ""}
        >
          {capitalizeFirstLetter(category)}
        </button>
      ))}
    </div>
  );
};

export default SortingButtons;
