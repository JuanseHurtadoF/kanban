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

const CardInfo: FC<CardInfoProps> = ({ onClick }) => {
  const { title, description, subtasks, _id } = useSelector(
    (state: RootState) => state.global.highlightedCard
  );
  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);
  const { deleteTask } = useRemoveTask();

  const { activeBoard } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();

  const highlightedCard = useSelector(
    (state: RootState) => state.global.highlightedCard
  );

  const currentBoardId = useSelector(
    (state: any) => state.global.activeBoard._id
  );

  const [toggleSubtask] = useToggleSubtaskMutation();

  const handleSubtaskToggle = (item: subtask) => {
    dispatch(
      toggleSubtaskLocal({
        subtaskId: item._id,
        cardId: highlightedCard._id,
      })
    );
    toggleSubtask({
      subtaskId: item._id,
    });
  };

  const handleDelete = (e: any) => {
    onClick(e);
    deleteTask({
      columnId: highlightedCard.columnId,
      taskId: highlightedCard._id,
      prevTask: highlightedCard,
    });
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div>
          <div className={styles.textContainer}>
            <EditableHeading
              variant={2}
              title={title}
              onEdit={() => console.log("Editing")}
            />
            <textarea
              defaultValue={description}
              placeholder="Description..."
              className={styles.text}
            >
              {/* {description} */}
            </textarea>
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
