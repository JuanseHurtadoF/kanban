import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@types";
import styles from "./cardInfo.module.scss";
import { CardInfoProps } from "@types";
import { CheckBox, Dropdown, Heading, Text } from "@components";

const CardInfo: FC<CardInfoProps> = ({ onClick }) => {
  const { title, description, subtasks, status } = useSelector(
    (state: RootState) => state.global.highlightedCard
  );

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div className={styles.textContainer}>
          <Heading variant={2} title={title} />
          <p className={styles.text}>{description}</p>
        </div>
        <div className={styles.subtasks}>
          <div className={styles.subtasksTitle}>
            <Text
              variant="secondary"
              text={`Subtasks (0 of ${subtasks?.length})`}
            />
          </div>
          {subtasks?.map((item) => {
            return <CheckBox task={item.title} key={item.title} />;
          })}
        </div>
        <div className={styles.status}>
          <div className={styles.statusTitle}>
            <Dropdown
              title="Current Status"
              options={["ToDo", "Doing", "Done"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
