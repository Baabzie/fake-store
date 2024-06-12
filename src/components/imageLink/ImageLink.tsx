import Link from "next/link";
import styles from "./ImageLink.module.scss";
// import Image from "next/image";

interface ImageLinkProps {
  category: string;
  image: string;
  alt: string;
  text: string;
}

const ImageLink: React.FC<ImageLinkProps> = ({
  category,
  image,
  alt,
  text,
}) => {
  return (
    <div className={styles["image-div"]}>
      <Link href={`/categoryPage/${category}`}>
        <img src={`./images/${image}.jpg`} alt={`${alt}`} />
        <h2 className={styles["text-over-image"]}>{text}</h2>
      </Link>
    </div>
  );
};

export default ImageLink;
