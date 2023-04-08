import React, { FC, useState } from "react";
import { CardProps, ColumnProps } from "@types";
import styles from "./column.module.scss";
import { Heading } from "@components";
import Card from "../card";
import { Reorder } from "framer-motion";

const Column: FC<ColumnProps> = ({ name, tasks }) => {
  const [data, setData] = useState(tasks);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.label}></div>
        <Heading title={`${name} (${tasks.length})`} variant={4} />
      </div>
      <Reorder.Group
        className={styles.cardsContainer}
        values={data}
        onReorder={setData}
      >
        {data.map((card: CardProps) => {
          return (
            <Reorder.Item whileDrag={{rotate: 2}} value={card} key={card.title}>
              <Card title={card.title} subtasks={card.subtasks} />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default Column;
