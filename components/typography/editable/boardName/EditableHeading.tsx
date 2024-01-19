import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Icon } from "@components";
import styles from "./EditableHeading.module.scss";
import useEditBoardName from "hooks/useEditBoardName";
import { EditableHeadingProps } from "@types";

const EditableHeading: FC<EditableHeadingProps> = ({
  variant,
  title,
  onEdit,
}) => {
  const { boardId } = useSelector((state: any) => ({
    boardId: state.global.activeBoard?._id,
  }));

  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Sets new title when title prop changes
  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleChange = (e: any) => {
    setNewTitle(e.target.value);
  };

  const toggleIsEditing = (e: any, action?: "cancel") => {
    setIsEditing(!isEditing);
    if (action === "cancel") {
      setNewTitle(title);
    }
  };

  const handleSaveEdit = async (e: any) => {
    // If name hasn't changed or is empty, don't make API call
    setIsEditing(false);

    if (newTitle === title || newTitle === "") {
      return;
    }

    // Update board name
    const response = await onEdit({ name: newTitle, prevName: title });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSaveEdit(e);
    }
  };

  return (
    <div
      onClick={() => setIsEditing(true)}
      data-isediting={isEditing}
      className={styles.container}
    >
      {!isEditing && <Heading title={title} variant={variant} />}
      {isEditing && (
        <input
          type="text"
          value={newTitle}
          onChange={handleChange}
          className={styles.input}
          autoFocus
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          data-variant={variant}
        ></input>
      )}
      {/* {title && (
        <div className={styles.optionsContainer}>
          {isEditing ? (
            <div className={styles.options}>
              <Button
                variant="tertiary"
                label="Cancel"
                onClick={(e: any) => toggleIsEditing(e, "cancel")}
              />
              <Button
                variant="secondarySm"
                label="Save"
                onClick={handleSaveEdit}
              />
            </div>
          ) : (
            
          )}
        </div>
      )} */}
    </div>
  );
};

export default EditableHeading;
