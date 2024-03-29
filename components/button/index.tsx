import React, { FC } from "react";
import { ButtonProps } from "@types";
import styles from "./button.module.scss";

const Button: FC<ButtonProps> = ({ variant, label, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${styles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;
