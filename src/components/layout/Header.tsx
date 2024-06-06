// import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  const capitalizeFirstLetter = (string: string): string => {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["top"]}>
        <div className={styles["left-top"]}></div>
        <div className={styles["center-top"]}>
          <Link href="/store">
            {/* <h1>Fake-Store</h1> */}
            <img
              className={styles["logo"]}
              src="./images/logo.webp"
              alt="fake-store logo"
            ></img>
          </Link>
        </div>
        <div className={styles["right-top"]}>
          <Link href="/cartPage/cartPage">
            <ShoppingCartIcon className={styles["icon"]} />
            Cart ({0})
          </Link>
        </div>
      </div>

      <nav>
        <ul>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                <Link href={`/categoryPage/${category}`}>
                  <p>{capitalizeFirstLetter(category)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
