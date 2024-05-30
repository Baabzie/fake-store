import React from "react";
import { useState } from "react";
import styles from "./DescriptionAccordion.module.scss";

interface DescriptionAccordionProps {
  description: string;
}

const DescriptionAccordion: React.FC<DescriptionAccordionProps> = ({
  description,
}) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  const handleClick = () => {
    setOpenAccordion((prevState) => !prevState);
  };

  return (
    <div className={styles["accordion-div"]}>
      <button onClick={() => handleClick()}>Description</button>
      {openAccordion && (
        <div className={styles["description-div"]}>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default DescriptionAccordion;
