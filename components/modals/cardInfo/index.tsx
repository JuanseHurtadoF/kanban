import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@types";
import styles from "./cardInfo.module.scss";
import { CardInfoProps, subtask } from "@types";
import { Button, CheckBox, EditableHeading, Text } from "@components";
import { useToggleSubtaskMutation } from "state/api";
import { toggleSubtaskLocal } from "state";
import { useDispatch } from "react-redux";
import useRemoveTask from "hooks/useRemoveTask";
import useEditTask from "hooks/useEditTask";

const CardInfo: FC<CardInfoProps> = ({ onClick }) => {
  const { title, description, subtasks, _id, columnId } = useSelector(
    (state: RootState) => state.global.highlightedCard
  );
  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);
  const { deleteTask } = useRemoveTask();
  const { updateTask } = useEditTask();
  const dispatch = useDispatch();

  const highlightedCard = useSelector(
    (state: RootState) => state.global.highlightedCard
  );

  const [toggleSubtask] = useToggleSubtaskMutation();

  const handleSubtaskToggle = (item: subtask) => {
    dispatch(
      toggleSubtaskLocal({
        subtaskId: item._id,
        cardId: _id,
      })
    );
    toggleSubtask({
      subtaskId: item._id,
    });
  };

  const handleDelete = (e: any) => {
    onClick(e);
    deleteTask({
      columnId,
      taskId: _id,
      prevTask: highlightedCard,
    });
  };

  // const handleTaskChange = async (name, prevName) => {
  //   const response = await updateTask(name, prevName);
  // };

  const changeTaskName = ({ name, prevName }) => {
    updateTask({ name, prevName });
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div>
          <div className={styles.textContainer}>
            <EditableHeading
              variant={2}
              title={title}
              onEdit={changeTaskName}
            />
            <textarea
              defaultValue={description}
              placeholder="Description..."
              className={styles.text}
            ></textarea>
          </div>
          <div className={styles.subtasks}>
            <div className={styles.subtasksTitle}>
              <Text
                variant="secondary"
                text={`Subtasks (${completedSubtasks.length} of ${subtasks?.length})`}
              />
            </div>
            {subtasks?.map((item) => {
              return (
                <CheckBox
                  title={item.title}
                  key={item.title}
                  isChecked={item.isCompleted}
                  onClick={() => handleSubtaskToggle(item)}
                />
              );
            })}
          </div>
          {/* <div className={styles.status}>
            <div className={styles.statusTitle}>
              <Dropdown
                title="Status"
                options={activeBoard?.columns?.map((column: any) => {
                  return {
                    name: column.name,
                    id: column._id,
                  };
                })}
                onChange={(e) => console.log("Changing")}
              />
            </div>
          </div> */}
        </div>
        <div className={styles.delete}>
          <Button
            label="Delete Task"
            variant="destructiveSm"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
