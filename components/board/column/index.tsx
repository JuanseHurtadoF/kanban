import React, { FC } from "react";
import { CardProps, ColumnProps } from "@types";
import styles from "./column.module.scss";
import { Heading } from "@components";
import Card from "../card";

const Column: FC<ColumnProps> = ({ name, cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.label}></div>
        <Heading title={`${name} (${cards.length})`} variant="cuaternary" />
      </div>
      <div className={styles.cardsContainer}>
      {cards.map((card: CardProps) => {
        return (
          <Card key={card.title} title={card.title} subtasks={card.subtasks} />
        );
      })}
      </div>
    </div>
  );
};

export default Column;
