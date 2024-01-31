/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Heading, Icon, Text } from "@components";
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
  imageId,
  imageUrl,
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
      imageId,
      imageUrl,
    };
    dispatch(setHighlightedCard(card));
    dispatch(toggleCardInfoModal(true));
  };

  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);

  return (
    <div onClick={openCardDetails} className={styles.container}>
      {imageUrl && (
        <div className={styles.imgContainer}>
          <img alt="Card Image" className={styles.img} src={imageUrl}></img>
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
