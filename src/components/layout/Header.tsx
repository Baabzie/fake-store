// import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("movieList");
      if (element) {
        const offset = element.offsetTop - 200;

        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > offset);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "black-bg" : "transparent"}>
      <Link href="/store">
        {/* <h1>Fake-Store</h1> */}
        <img className={styles["logo"]} src="./images/logo.webp"></img>
      </Link>
      {/* <NavBar /> */}
    </header>
  );
}
