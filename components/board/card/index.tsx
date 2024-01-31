import React, { FC, useEffect } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Button, Heading, Icon, Text } from "@components";
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
  image,
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
      image,
    };
    dispatch(setHighlightedCard(card));
    dispatch(toggleCardInfoModal(true));
  };

  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);

  return (
    <div onClick={openCardDetails} className={styles.container}>
      {image && (
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image}></img>
        </div>
      )}
      <Heading title={title} variant={3} />
      {subtasks?.length > 0 && (
        <div className={styles.subtaskContainer}>
          <Text
            text={`${completedSubtasks.length}/${subtasks?.length}`}
            variant="tertiary"
          />
          <Icon variant="subtask" width={15} height={15} />
        </div>
      )}
    </div>
  );
};

export default Card;
