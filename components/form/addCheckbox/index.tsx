import React, { FC } from "react";
import styles from "./addCheckbox.module.scss";
import { AddCheckBoxProps } from "@types";
import Icon from "@components/icons";
import { useState } from "react";
import useSubtaskActions from "hooks/useSubtaskActions";

const AddCheckbox: FC<AddCheckBoxProps> = ({ stopEditing }) => {
  const [subtaskTitle, setSubtaskTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const { addNewSubtask } = useSubtaskActions();

  const handleDeleteSubtask = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEdit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setSubtaskTitle(e.target.value);
  };

  const saveNewSubtask = (e: any) => {
    if (subtaskTitle === "") return;

    setIsEditing(false);
    stopEditing();
    addNewSubtask({ newTitle: subtaskTitle });
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <div className={styles.checkbox}></div>
        {!isEditing ? (
          <p className={styles.label}>{subtaskTitle}</p>
        ) : (
          <input
            onBlur={saveNewSubtask}
            data-isediting={isEditing}
            value={subtaskTitle}
            onChange={handleChange}
            className={styles.input}
            autoFocus={true}
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
        <div onClick={() => console.log("delete")} className={styles.icon}>
          <Icon height={16} width={16} variant="delete" />
        </div>
      </div>
    </div>
  );
};

export default AddCheckbox;
