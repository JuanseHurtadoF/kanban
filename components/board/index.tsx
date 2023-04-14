import React, { FC } from "react";
import styles from "./board.module.scss";
import { Column } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { addColumn } from "state";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const board = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  const handleNewColumn = () => {
    const newColumn = {
      name: "Testing",
      tasks: [
        {
          title: "Testing",
          description:
            "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
          status: "Done",
          subtasks: [
            {
              title: "Complete 5 wireframe prototype tests",
              isCompleted: true,
            },
          ],
        },
      ],
    };
    dispatch(addColumn(newColumn));
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
        {board.columns.map(({ name, tasks }: ColumnProps) => {
          return <Column key={name} name={name} tasks={tasks} />;
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
