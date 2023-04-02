import React from "react";
import { FC } from "react";
import { ButtonProps } from "@types";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ variant, label, onClick }) => {
  return (
    // variant: "primaryLg" | "primarySm" | "secondary" | "destructive";

    <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
      {label}
    </button>
  );
};

export default Button;
