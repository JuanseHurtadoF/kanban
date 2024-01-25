import React, { FC } from "react";
import styles from "./checkbox.module.scss";
import { CheckBoxProps } from "@types";
import Icon from "@components/icons";
import useSubtaskActions from "hooks/useSubtaskActions";

const CheckBox: FC<CheckBoxProps> = ({ _id, title, isChecked, onClick }) => {
  const { deleteSubtask } = useSubtaskActions();

  const handleDeleteSubtask = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    deleteSubtask({ subtaskId: _id });
  };

  const handleCheck = (e: any) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <div onClick={handleCheck} className={styles.container}>
      <div className={styles.checkboxContainer}>
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
          {title}
        </p>
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Icon height={16} width={16} variant="edit" />
        </div>
        <div onClick={handleDeleteSubtask} className={styles.icon}>
          <Icon height={16} width={16} variant="delete" />
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
