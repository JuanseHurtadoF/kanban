import React, { FC } from "react";
import styles from "./input.module.scss";
import { InputProps } from "@types";

const Input: FC<InputProps> = ({
  title,
  placeholder,
  error,
  errorMessage,
  onChange,
  value,
  name,
  inputRef,
}) => {
  return (
    <div className={styles.container}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.inputContainer}>
        <input
          ref={inputRef} // use inputRef if provided, otherwise use local ref
          onChange={onChange}
          placeholder={placeholder}
          data-haserror={error}
          className={styles.input}
          value={value}
          name={name}
        ></input>
        {error && (
          <p className={styles.error}>
            {errorMessage ? errorMessage : "Error"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
