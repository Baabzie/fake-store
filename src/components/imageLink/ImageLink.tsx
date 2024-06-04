import Link from "next/link";

interface ImageLinkProps {
  category: string;
  image: string;
  alt: string;
}

const ImageLink: React.FC<ImageLinkProps> = ({ category, image, alt }) => {
  return (
    <div>
      <Link href={`/categoryPage/${category}`}>
        <img src={`./images/${image}.jpg`} alt={`${alt}`} />
      </Link>
    </div>
  );
};

export default ImageLink;
