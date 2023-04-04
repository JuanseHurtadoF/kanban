import React, { FC } from "react";
import { TextProps } from "@types";
import styles from "./text.module.scss";

const Text: FC<TextProps> = ({ variant, text }) => {
  return <p className={styles[variant]}>{text}</p>;
};

export default Text;
