import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ItemI } from "@/interfaces/ItemI";
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
  );
};

export default ItemCarousel;
