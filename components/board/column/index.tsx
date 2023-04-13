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
      <div className={styles.cardsContainer}>
        {data.map((card: CardProps) => {
          return (
            <Card
              key={card.title}
              title={card.title}
              subtasks={card.subtasks}
              description={card.description}
              status={card.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
