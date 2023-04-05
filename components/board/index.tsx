import React, { FC } from "react";
import styles from "./board.module.scss";
import { data } from "@data";
import { Column } from "@components";

const Board: FC = () => {
  const columns = data.boards[0].columns;

  return (
    <div className={styles.container}>
      <div className={styles.board}>
      {columns.map(({name, tasks}) => {
        return <Column key={name} name={name} cards={tasks} />;
      })}
      </div>
    </div>
  );
};

export default Board;
