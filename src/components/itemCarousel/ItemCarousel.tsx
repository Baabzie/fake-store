import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ItemI } from "@/interfaces/ItemI";
import styles from "./ItemCarousel.module.scss";
import SortingButtons from "./SortingButtons";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import Image from "next/image";

interface CarouselProps {
  items: ItemI[];
}

const ItemCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortedItems, setSortedItems] = useState<ItemI[]>([]);
  const carouselRef = useRef<Carousel>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setSortedItems([...items]);
    } else {
      const newSortedItems = items.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setSortedItems(newSortedItems);
    }
  }, [activeCategory, items]);

  useEffect(() => {
    // Reset the carousel to the first slide when sortedItems change.
    if (carouselRef.current) {
      carouselRef.current.moveTo(0);
    }
  }, [sortedItems]);

  // Create an array of grouped items to show in carousel.
  const groupedItems = [];
  for (let i = 0; i < sortedItems.length; i += 4) {
    groupedItems.push(sortedItems.slice(i, i + 4));
  }

  return (
    <div className={styles["carousel-div"]}>
      <SortingButtons
        items={items}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Carousel
        ref={carouselRef}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        interval={10000}
        className={styles["carousel"]}
      >
        {groupedItems.map((group, index) => (
          <div key={index} className={styles["carousel-slide"]}>
            {group.map((item, index) => (
              <Link
                href={`/store/${item.id}`}
                key={index}
                className={styles["item-btn"]}
              >
                <div className={styles["img-div"]}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles["text-div"]}>
                  <p>${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ItemCarousel;
