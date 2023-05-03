import React, { FC } from "react";
import styles from "./checkbox.module.scss";
import { CheckBoxProps } from "@types";
import { useState } from "react";

const CheckBox: FC<CheckBoxProps> = ({ task }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div onClick={handleCheck} className={styles.container}>
      <div
        className={
          isChecked
            ? `${styles.checkbox} ${styles.checkboxChecked}`
            : `${styles.checkbox}`
        }
      >
        {isChecked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
      <p
        className={
          isChecked
            ? `${styles.label} ${styles.labelChecked}`
            : `${styles.label}`
        }
      >
        {task}
      </p>
    </div>
  );
};

export default CheckBox;
