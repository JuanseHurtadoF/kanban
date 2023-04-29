import React, { FC, useEffect } from "react";
import styles from "./board.module.scss";
import { Column } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { useAddColumnMutation, useAddTaskMutation } from "state/api";
import { addColumnLocal, removeColumnLocal } from "state";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const { allBoards, activeBoard, user } = useSelector(
    (state: any) => state.global
  );
  const dispatch = useDispatch();

  const [addColumn] = useAddColumnMutation();

  const handleNewColumn = async () => {
    const boardId = activeBoard._id;
    const id = `newBoard-${Date.now()}`;

    const newColumn = {
      name: "Done",
      tasks: [],
      _id: id,
    };

    dispatch(addColumnLocal({ column: newColumn, boardId }));

    try {
      const result = await addColumn({
        name: newColumn.name,
        boardId,
      });
      if (result.error?.status === 500) {
        dispatch(removeColumnLocal({ boardId, columnId: id }));
      }
    } catch (error: any) {
      // dispatch(removeColumnLocal({ boardId, columnId: id }));
      console.log(error);
    }
  };

  return (
    <div
      className={
        fullWidth
          ? `${styles.container} ${styles.containerFullWidth}`
          : `${styles.container}`
      }
    >
      <div className={styles.board}>
        {activeBoard?.columns?.map(({ name, tasks, _id }: ColumnProps) => {
          return <Column _id={_id} key={_id} name={name} tasks={tasks} />;
        })}
        <div onClick={handleNewColumn} className={styles.newColumn}>
          <p className={styles.text}>+ New Column</p>
        </div>
        <div className={styles.empty}></div>
      </div>
    </div>
  );
};

export default Board;
