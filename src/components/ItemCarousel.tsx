import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { ItemI } from "@/interfaces/ItemI"; // Adjust the path accordingly
import ItemBtn from "./ItemBtn"; // Adjust the path accordingly
import styles from "./ItemCarousel.module.scss";

interface CarouselProps {
  items: ItemI[];
}

const ItemCarousel: React.FC<CarouselProps> = ({ items }) => {
  // Create an array of grouped items
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 4) {
    groupedItems.push(items.slice(i, i + 4));
  }

  return (
    <Carousel showThumbs={false}>
      {groupedItems.map((group, index) => (
        <div key={index} className={styles["carousel-slide"]}>
          {group.map((item) => (
            <ItemBtn key={item.id} item={item} />
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default ItemCarousel;
