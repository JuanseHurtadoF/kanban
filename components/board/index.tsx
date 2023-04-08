import React, { FC } from "react";
import styles from "./board.module.scss";
import { data } from "@data";
import { Column } from "@components";
import { ColumnProps } from "@types";
import { useSelector } from "react-redux";

const Board: FC = () => {
  const columns = useSelector((state: any) => state.global.boards[0].columns);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {columns.map(({ name, tasks }: ColumnProps) => {
          return <Column key={name} name={name} tasks={tasks} />;
        })}
        <div
          onClick={() => console.log("New column")}
          className={styles.newColumn}
        >
          <p className={styles.text}>+ New Column</p>
        </div>
        <div className={styles.empty}></div>
      </div>
    </div>
  );
};

export default Board;
