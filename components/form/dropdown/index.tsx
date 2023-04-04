import React, { FC } from "react";
import { DropdownProps } from "@types";
import styles from "./dropdown.module.scss";
import { useState } from "react";

const Dropdown: FC<DropdownProps> = ({ title, options }) => {
  const [value, setValue] = useState<string>(options[0]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleFocusChange = () => {
    setIsSelected(!isSelected);
  };

  const handleValueChange = (value: string) => {
    setValue(value);
    handleFocusChange();
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div
        onClick={handleFocusChange}
        className={
          isSelected
            ? `${styles.labelContainer} ${styles.labelContainerFocused}`
            : `${styles.labelContainer}`
        }
      >
        <p className={styles.label}>{value}</p>
        <div className={styles.arrow}>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.79834 1.54858L5.49682 6.24707L10.1953 1.54858"
              stroke="#635FC7"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      {isSelected && (
        <div className={styles.list}>
          {options.map((option: string) => {
            return (
              <p
                onClick={() => handleValueChange(option)}
                className={styles.option}
                key={option}
              >
                {option}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
