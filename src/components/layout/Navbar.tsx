import Link from "next/link";
import styles from "./Navbar.module.scss";

interface NavbarMenuProps {
  categories: string[];
}

const Navbar: React.FC<NavbarMenuProps> = ({ categories }) => {
  const capitalizeFirstLetter = (string: string): string => {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className={styles["navbar"]}>
      <ul>
        {categories.map((category, i) => (
          <li key={i}>
            <Link href={`/categoryPage/${category}`}>
              <p>{capitalizeFirstLetter(category)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
