import React, { FC, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Heading, Icon } from "@components";
import styles from "./editableBoardName.module.scss";
import editBoardName from "@utils/lib/board/editBoardName";

const EditableBoardName: FC = () => {
  const boardName = useSelector((state: any) => state.global.activeBoard.name);
  const boardId = useSelector((state: any) => state.global.activeBoard._id);

  const [newBoardName, setNewBoardName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const ignoreBlurRef = useRef(false);

  const handleChange = (e: any) => {
    setNewBoardName(e.target.value);
  };

  const toggleIsEditing = (e: any) => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = (e: any) => {
    setIsEditing(false);
    setNewBoardName(boardName);
    ignoreBlurRef.current = true;
  };

  useEffect(() => {
    setNewBoardName(boardName);
  }, [boardName]);

  useEffect(() => {
    console.log(`Editing State: ${isEditing}`);
  }, [isEditing]);

  const editBoardNameHandler = async () => {
    const res = await editBoardName({
      name: newBoardName,
      boardId,
    });
    if (res) {
      setIsEditing(false);
    }
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
                onClick={handleCancelEdit}
              />
              <Button
                variant="secondarySm"
                label="Save"
                onClick={editBoardNameHandler}
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
