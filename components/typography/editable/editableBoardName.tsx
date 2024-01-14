import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Icon } from "@components";
import styles from "./editableBoardName.module.scss";
import useEditBoardName from "hooks/useEditBoardName";

const EditableBoardName: FC = () => {
  const { boardName, boardId } = useSelector((state: any) => ({
    boardName: state.global.activeBoard.name,
    boardId: state.global.activeBoard._id,
  }));

  const [newBoardName, setNewBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { updateBoardName, error } = useEditBoardName();

  useEffect(() => {
    setNewBoardName(boardName);
  }, [boardName]);

  const handleChange = (e: any) => {
    setNewBoardName(e.target.value);
  };

  const toggleIsEditing = (e: any, action?: "cancel") => {
    setIsEditing(false);
    if (action === "cancel") {
      setNewBoardName(boardName);
      console.log("cancel");
    }
  };

  const handleSaveEdit = async (e: any) => {
    // If name hasn't changed or is empty, don't make API call
    if (newBoardName === boardName || newBoardName === "") {
      setIsEditing(false);
      return;
    }

    // Update board name
    setIsEditing(false);
    const response = await updateBoardName({
      boardId,
      name: newBoardName,
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
          value={newBoardName}
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

export default EditableBoardName;
