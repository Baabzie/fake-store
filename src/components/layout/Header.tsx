// import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/configureStore";
import Image from "next/image";

export default function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  useEffect(() => {
    let amount = 0;
    cartItems.forEach((item) => {
      amount += item.quantity;
    });
    setCartQuantity(amount);
  }, [cartItems]);

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
            <Image
              className={styles["logo"]}
              src="./images/logo.webp"
              alt="fake-store logo"
            />
          </Link>
        </div>
        <div className={styles["right-top"]}>
          <Link href="/cartPage/cartPage">
            <ShoppingCartIcon className={styles["icon"]} />
            Cart ({cartQuantity})
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
