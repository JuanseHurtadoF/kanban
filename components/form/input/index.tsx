import React, { FC } from "react";
import styles from "./input.module.scss";
import { InputProps } from "@types";

const Input: FC<InputProps> = ({ title, placeholder, error, errorMessage }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.inputContainer}>
        <input
          placeholder={placeholder}
          data-hasError={error}
          className={styles.input}
        ></input>
        {error && <p className={styles.error}>{errorMessage ? errorMessage : 'Error'}</p>}
      </div>
    </div>
  );
};

export default Input;
