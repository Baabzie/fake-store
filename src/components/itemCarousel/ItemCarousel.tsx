import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ItemI } from "@/interfaces/ItemI";
import styles from "./ItemCarousel.module.scss";
import SortingButtons from "./SortingButtons";
import { useState, useEffect } from "react";

interface CarouselProps {
  items: ItemI[];
}

const ItemCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortedItems, setSortedItems] = useState<ItemI[]>([]);

  useEffect(() => {
    if (activeCategory === "All") {
      setSortedItems([...items]);
    } else {
      const newSortedItems: ItemI[] = [];
      items.forEach((item) => {
        if (item.category === activeCategory.toLowerCase()) {
          newSortedItems.push(item);
        }
      });
      setSortedItems([...newSortedItems]);
    }
  }, [activeCategory]);

  // Create an array of grouped items to show in carousel.
  const groupedItems = [];
  for (let i = 0; i < sortedItems.length; i += 4) {
    groupedItems.push(sortedItems.slice(i, i + 4));
  }

  return (
    <>
      <SortingButtons
        items={items}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        interval={10000}
      >
        {groupedItems.map((group, index) => (
          <div key={index} className={styles["carousel-slide"]}>
            {group.map((item, index) => (
              <button key={index} className={styles["item-btn"]}>
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
            ))}
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ItemCarousel;
