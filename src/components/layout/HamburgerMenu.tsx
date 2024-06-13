import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import styles from "./HamburgerMenu.module.scss";
import { useEffect } from "react";

interface HamburgerMenuProps {
  categories: string[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <MenuIcon />
      </div>
      <nav className={`${styles.menu} ${isOpen ? "" : styles.hidden}`}>
        <ul>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <Link href={`/categoryPage/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
