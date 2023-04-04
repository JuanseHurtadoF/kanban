import React, { FC } from "react";
import { CardProps } from "@types";
import styles from "./card.module.scss";
import { Heading, Text } from "@components";
import { motion } from "framer-motion";

const Card: FC<CardProps> = ({ title, subtasks }) => {
  return (
    <motion.div whileDrag={{ scale: 10 }} className={styles.container}>
      <div className={styles.titleContainer}>
        <Heading title={title} variant={3} />
      </div>
      <Text text={`0 of ${subtasks.length} subtasks`} variant="tertiary" />
    </motion.div>
  );
};

export default Card;
