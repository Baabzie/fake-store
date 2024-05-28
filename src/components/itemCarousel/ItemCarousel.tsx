import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ItemI } from "@/interfaces/ItemI";
import ItemBtn from "../ItemBtn";
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
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showIndicators={false}
      interval={10000}
    >
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
