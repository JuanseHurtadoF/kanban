import React, { FC, useEffect } from "react";
import styles from "./board.module.scss";
import { Column } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { useAddColumnMutation, useAddTaskMutation } from "state/api";
import { addColumnLocal, removeColumnLocal } from "state";

const Board: FC<BoardProps> = ({ fullWidth, toggleEditBoard }) => {
  const { allBoards, activeBoard, user } = useSelector(
    (state: any) => state.global
  );

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
        <div onClick={toggleEditBoard} className={styles.newColumn}>
          <p className={styles.text}>+ New Column</p>
        </div>
        <div className={styles.empty}></div>
      </div>
    </div>
  );
};

export default Board;
