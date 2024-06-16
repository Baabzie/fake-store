import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import styles from "./HamburgerMenu.module.scss";

interface HamburgerMenuProps {
  categories: string[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.navbar} ref={menuRef}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <MenuIcon className={styles["icon"]} />
      </div>
      <nav className={`${styles.menu} ${isOpen ? "" : styles.hidden}`}>
        <ul>
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <Link href={`/categoryPage/${category}`} onClick={toggleMenu}>
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
