import React, { FC } from "react";
import styles from "./deleteBoard.module.scss";
import { DeleteBoardProps } from "@types";
import { useSelector } from "react-redux";
import { Button, Heading, Text } from "@components";
import { useRemoveBoardMutation } from "state/api";
import { addBoardLocal, removeBoardLocal } from "state";
import { useDispatch } from "react-redux";

const DeleteBoard: FC<DeleteBoardProps> = ({ onClick }) => {
  const currentBoard = useSelector((state: any) => state.global.activeBoard);
  const [removeBoard] = useRemoveBoardMutation();

  const dispatch = useDispatch();

  const deleteBoard = async (event: any) => {
    event.preventDefault();

    const removingBoard = currentBoard;

    dispatch(removeBoardLocal(currentBoard._id));
    onClick();
    try {
      const result = await removeBoard({ boardId: currentBoard._id });
    } catch (error) {
      dispatch(addBoardLocal(removingBoard));
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e: any) => e.stopPropagation()} className={styles.modal}>
        <Heading variant={3} title="Delete this board?" />
        <p className={styles.text}>
          {`Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.`}
        </p>
        <div className={styles.buttons}>
          <Button
            variant="destructive"
            label="Delete Board"
            onClick={deleteBoard}
          />
          <Button variant="secondary" label="Cancel" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
