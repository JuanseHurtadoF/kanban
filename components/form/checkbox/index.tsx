import React, { FC, useEffect } from "react";
import styles from "./checkbox.module.scss";
import { CheckBoxProps } from "@types";
import Icon from "@components/icons";
import useSubtaskActions from "hooks/useSubtaskActions";
import { useState } from "react";
import { set } from "mongoose";

const CheckBox: FC<CheckBoxProps> = ({
  _id,
  title,
  isChecked,
  isEditableDefault,
  onClick,
}) => {
  const [subtaskTitle, setSubtaskTitle] = useState<string>(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSubtask, setNewSubtask] = useState<string>(title);
  const { deleteSubtask, editSubtaskName } = useSubtaskActions();

  useEffect(() => {
    setIsEditing(isEditableDefault);
  }, [isEditableDefault]);

  const handleDeleteSubtask = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    deleteSubtask({ subtaskId: _id });
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCheck = (e: any) => {
    if (isEditing) return;
    e.preventDefault();
    onClick(e);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setNewSubtask(e.target.value);
  };

  const saveNewSubtask = (e: any) => {
    e.preventDefault();
    setIsEditing(false);
    if (newSubtask === title) return;
    if (newSubtask === "") {
      setSubtaskTitle(title);
      return;
    }
    setSubtaskTitle(newSubtask);
    editSubtaskName({ subtaskId: _id, newTitle: newSubtask });
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
        {!isEditing ? (
          <p
            className={
              isChecked
                ? `${styles.label} ${styles.labelChecked}`
                : `${styles.label}`
            }
          >
            {subtaskTitle}
          </p>
        ) : (
          <input
            onBlur={saveNewSubtask}
            data-isediting={isEditing}
            value={newSubtask}
            onChange={handleChange}
            className={styles.input}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveNewSubtask(e);
              }
            }}
          ></input>
        )}
      </div>
      <div className={styles.icons}>
        <div onClick={handleEdit} className={styles.icon}>
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
