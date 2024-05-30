import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ItemI } from "@/interfaces/ItemI";
import styles from "./ProductDetailPage.module.scss";
import DescriptionAccordion from "@/components/descriptionAccordion/DescriptionAccordion";

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const itemId = router.query.itemId;

  const [item, setItem] = useState<ItemI>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${itemId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ItemI = await response.json();
        setItem(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  // For testing only.
  //   useEffect(() => {
  //     console.log(item);
  //   }, [item]);

  return (
    <div className={styles["product-detail-div"]}>
      <div className={styles["img-div"]}>
        <img src={item?.image} alt={item?.title} />
      </div>
      <div className={styles["information-div"]}>
        <div className={styles["title-price-div"]}>
          <h2>{item?.title}</h2>
          <p>${item?.price}</p>
        </div>
        <div>
          <button className={styles["add-to-cart-btn"]}>Add to cart</button>
        </div>
        <DescriptionAccordion description={item?.description || ""} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
