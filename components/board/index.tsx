import React, { FC } from "react";
import styles from "./board.module.scss";
import { data } from "@data";
import { Column } from "@components";
import { ColumnProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { addColumn } from "state";

const Board: FC = () => {
  const columns = useSelector((state: any) => state.global[0].columns);
  const dispatch = useDispatch();
  // const data = useSelector((state: any) => state.global);

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
    <div className={styles.container}>
      <div className={styles.board}>
        {columns.map(({ name, tasks }: ColumnProps) => {
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
