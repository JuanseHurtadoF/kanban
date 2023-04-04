import React, { FC } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Heading, Text } from "@components";

const Card: FC<CardProps> = ({ title, subtasks }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Heading title={title} variant="tertiary" />
      </div>
      <Text
        text={`0 of ${subtasks.length} subtasks`}
        variant="tertiary"
      />
    </div>
  );
};

export default Card;
