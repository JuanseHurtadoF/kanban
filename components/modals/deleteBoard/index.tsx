import React, { FC } from "react";
import styles from "./deleteBoard.module.scss";
import { DeleteBoardProps } from "@types";
import { useSelector } from "react-redux";
import { Button, Heading, Text } from "@components";
const DeleteBoard: FC<DeleteBoardProps> = ({ onClick }) => {
  const boardId = useSelector((state: any) => state.global.activeBoard._id);
  

  const deleteBoard = async (event: any) => {
    event.stopPropagation();
    console.log("delete board");
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={deleteBoard} className={styles.modal}>
        <Heading variant={3} title="Delete this board?" />
        <p className={styles.text}>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className={styles.buttons}>
          <Button
            variant="destructive"
            label="Delete Board"
            onClick={() => console.log("delete")}
          />
          <Button variant="secondary" label="Cancel" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
