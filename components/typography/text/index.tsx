import React from "react";
import { FC } from "react";
import { TextProps } from "@types";
import styles from "./text.module.scss";

const Text: FC<TextProps> = ({ variant, text }) => {
  return (
    <>
      {variant === "primary" && <p className={styles[variant]}>{text}</p>}
      {variant === "secondary" && <p className={styles[variant]}>{text}</p>}
    </>
  );
};

export default Text;
