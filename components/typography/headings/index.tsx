import React, { FC } from "react";
import { HeadingProps } from "@types";
import styles from "./heading.module.scss";

const Heading: FC<HeadingProps> = ({ variant, title }) => {
  return (
    <>
      {variant === "primary" && <h1 className={styles[variant]}>{title}</h1>}
      {variant === "secondary" && <h2 className={styles[variant]}>{title}</h2>}
      {variant === "tertiary" && <h3 className={styles[variant]}>{title}</h3>}
      {variant === "cuaternary" && <h4 className={styles[variant]}>{title}</h4>}
    </>
  );
};

export default Heading;
