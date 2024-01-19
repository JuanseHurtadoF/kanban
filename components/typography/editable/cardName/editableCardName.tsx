import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Icon } from "@components";
import styles from "./editableBoardName.module.scss";
import useEditBoardName from "hooks/useEditBoardName";

const EditableCardName: FC = () => {
  const { boardName, boardId } = useSelector((state: any) => ({
    boardName: state.global.activeBoard.name,
    boardId: state.global.activeBoard?._id,
  }));

  const [newCardName, setNewCardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { updateBoardName } = useEditBoardName();

  useEffect(() => {
    setNewCardName(boardName);
  }, [boardName]);

  const handleChange = (e: any) => {
    setNewCardName(e.target.value);
  };

  const toggleIsEditing = (e: any, action?: "cancel") => {
    setIsEditing(!isEditing);
    if (action === "cancel") {
        setNewCardName(boardName);
    }
  };

  const handleSaveEdit = async (e: any) => {
    // If name hasn't changed or is empty, don't make API call
    if (newCardName === boardName || newCardName === "") {
      setIsEditing(false);
      return;
    }

    // Update board name
    setIsEditing(false);
    const response = await updateBoardName({
      boardId,
      name: newCardName,
      prevName: boardName,
    });
  };

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      data-isediting={isEditing}
      className={styles.container}
    >
      {!isEditing && <Heading title={boardName} variant={1} />}
      {isEditing && (
        <input
          type="text"
          value={newCardName}
          onChange={handleChange}
          className={styles.input}
          autoFocus
        ></input>
      )}
      {boardName && (
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
            <div onClick={toggleIsEditing} className={styles.iconContainer}>
              <Icon variant="edit" height={20} width={20} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableCardName;
