import React, { FC, useEffect } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Button, Heading, Text } from "@components";
import { useDispatch } from "react-redux";
import { setHighlightedCard } from "state";
import { toggleCardInfoModal } from "state/modals";

const Card: FC<CardProps> = ({
  title,
  description,
  subtasks,
  status,
  _id,
  columnId,
}) => {
  const dispatch = useDispatch();

  const openCardDetails = () => {
    const card: CardProps = {
      title,
      description,
      subtasks,
      status,
      _id,
      columnId,
    };
    dispatch(setHighlightedCard(card));
    dispatch(toggleCardInfoModal(true));
  };

  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);

  return (
    <div onClick={openCardDetails} className={styles.container}>
      <Heading title={title} variant={3} />
      {subtasks?.length > 0 && (
        <div className={styles.subtaskContainer}>
          <Text
            text={`${completedSubtasks.length} of ${subtasks?.length} subtasks`}
            variant="tertiary"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
