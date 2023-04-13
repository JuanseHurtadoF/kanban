import React, { FC, useState } from "react";
import styles from "./createCard.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CreateCardProps } from "@types";
import Heading from "@components/typography/headings";
import { Button, Icon, Input } from "@components";
import { subtask } from "@types";

const CreateCard: FC<CreateCardProps> = ({ onClick }) => {
  const [subtaskArray, setSubtaskArray] = useState<subtask[]>([
    { title: "", isCompleted: false },
  ]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setSubtaskArray
  };

  function removeSubtask(index: number) {
    const newArray: subtask[] = [...subtaskArray];

    if (index === 0) newArray.shift();
    else if (index === newArray.length - 1) newArray.pop();

    setSubtaskArray(newArray);
  }

  const addSubtask = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setSubtaskArray([...subtaskArray, { title: "", isCompleted: false }]);
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={styles.modal}
      >
        <Heading variant={2} title="Add new task" />
        <form className={styles.form}>
          <Input
            title="Title"
            placeholder="e.g. Take coffee break"
            error={false}
          />
          <Input
            title="Description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
            error={false}
          />
          <div className={styles.addSubtask}>
            <p className={styles.title}>Subtasks</p>
            <div className={styles.list}>
              {subtaskArray.map((subtask, index) => {
                return (
                  <div key={index} className={styles.input}>
                    <Input placeholder="e.g. Make coffee" error={false} />
                    <div
                      onClick={() => removeSubtask(index)}
                      className={styles.close}
                    >
                      <Icon variant="close" />
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              onClick={addSubtask}
              variant="secondary"
              label="+ Add New Subtask"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
