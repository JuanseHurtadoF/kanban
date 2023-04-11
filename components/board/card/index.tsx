import React, { FC } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Heading, Text } from "@components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setHighlightedCard } from "state";

const Card: FC<CardProps> = ({ title, description, subtasks, status }) => {
  const dispatch = useDispatch();

  console.log(description);

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
    <motion.div
      onClick={openCardDetails}
      whileDrag={{ scale: 10 }}
      className={styles.container}
    >
      <div className={styles.titleContainer}>
        <Heading title={title} variant={3} />
      </div>
      <Text text={`0 of ${subtasks.length} subtasks`} variant="tertiary" />
    </motion.div>
  );
};

export default Card;
