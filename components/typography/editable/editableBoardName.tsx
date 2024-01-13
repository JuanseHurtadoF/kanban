import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Icon } from "@components";
import styles from "./editableBoardName.module.scss";

const EditableBoardName: FC = () => {
  const boardName = useSelector((state: any) => state.global.activeBoard.name);

  const [newBoardName, setNewBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: any) => {
    setNewBoardName(e.target.value);
  };

  const handleBlur = (e: any) => {
    setIsEditing(false);
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = (e: any) => {
    console.log("cancel");
  };

  useEffect(() => {
    setNewBoardName(boardName);
  }, [boardName]);

  useEffect(() => {
    console.log(newBoardName);
  }, [newBoardName]);

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
          onBlur={handleBlur}
        ></input>
      )}
      {boardName && (
        <div className={styles.optionsContainer} onClick={toggleIsEditing}>
          {isEditing ? (
            <div className={styles.options}>
              <Button
                variant="tertiary"
                label="Cancel"
                onClick={handleCancelEdit}
              />
              <Button
                variant="secondarySm"
                label="Save"
                onClick={() => console.log("click")}
              />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <Icon variant="edit" height={20} width={20} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableBoardName;
