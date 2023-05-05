import React, { FC } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Heading, Text } from "@components";
import { useDispatch } from "react-redux";
import { setHighlightedCard } from "state";

const Card: FC<CardProps> = ({ title, description, subtasks, status }) => {
  const dispatch = useDispatch();

  const openCardDetails = () => {
    const card: CardProps = {
      title,
      description,
      subtasks,
      status,
    };
    dispatch(setHighlightedCard(card));
  };

  return (
    
    <div
      onClick={openCardDetails}
      className={styles.container}
    >
      <div className={styles.titleContainer}>
        <Heading title={title} variant={3} />
      </div>
      <Text text={`0 of ${subtasks?.length} subtasks`} variant="tertiary" />
    </div>
  );
};

export default Card;
