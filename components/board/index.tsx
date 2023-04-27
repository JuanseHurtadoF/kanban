import React, { FC } from "react";
import styles from "./board.module.scss";
import { Column } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { useAddColumnMutation, useAddTaskMutation } from "state/api";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const { activeBoard, user } = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  const [addColumn] = useAddColumnMutation();
  const [addTask] = useAddTaskMutation();

  const handleNewColumn = async () => {
    const result = await addColumn({
      boardId: activeBoard._id,
      name: "New Column",
      tasks: [],
    });
  };
  const handleNewTask = () => {
    addTask({
      title: "New Task",
      description: "New Task Description",
      board: activeBoard?._id,
      column: "644a9e3f850f3117d277aa43",
      user,
      subtasks: [],
    });
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
