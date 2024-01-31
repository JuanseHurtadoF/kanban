/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
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
import useAddImage from "hooks/useAddImage";
import { AddCheckbox } from "@components";

const CardInfo: FC<CardInfoProps> = ({ onClick }) => {
  const { title, description, subtasks, _id, columnId } = useSelector(
    (state: RootState) => state.global.highlightedCard
  );
  const [newDescription, setNewDescription] = useState("");
  const [isSubtaskBeingAdded, setIsSubtaskBeingAdded] =
    useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const completedSubtasks = subtasks?.filter((item) => item.isCompleted);
  const { deleteTask } = useRemoveTask();
  const { updateTask } = useEditTask();
  const { addImage } = useAddImage();
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

  const handleDescriptionChange = (e: any) => {
    e.preventDefault();
    setNewDescription(e.target.value);
  };

  const editTask: any = ({ name, prevName }) => {
    updateTask({ name, prevName, newDescription });
  };

  const addSubtask = (e: any) => {
    setIsSubtaskBeingAdded(true);
  };

  const handleAddSubtask = (e: any) => {
    setIsSubtaskBeingAdded(false);
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    addImage(file);

    // set image to the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <div>
          <div className={styles.infoContainer}>
            {image && (
              <div className={styles.imgContainer}>
                <img alt="Card Image" className={styles.img} src={image}></img>
              </div>
            )}
            <EditableHeading variant={2} title={title} onEdit={editTask} />
            <input onChange={handleFile} type="file"></input>
            <textarea
              defaultValue={description}
              placeholder="Description..."
              className={styles.text}
              onChange={handleDescriptionChange}
              onBlur={editTask}
            ></textarea>
          </div>
          <div className={styles.subtasks}>
            <div className={styles.subtasksTitle}>
              <Text variant="secondary" text={`Subtasks:`} />
            </div>
            {subtasks?.map((item) => {
              const _id = item?._id?.toString();
              return (
                <CheckBox
                  title={item.title}
                  key={_id ? _id : `NewSubtask${Date.now()}${Math.random()}`}
                  _id={_id}
                  isChecked={item.isCompleted}
                  onClick={() => handleSubtaskToggle(item)}
                />
              );
            })}
            {isSubtaskBeingAdded && (
              <AddCheckbox stopEditing={handleAddSubtask} />
            )}
            <Button
              onClick={addSubtask}
              label="Add Subtask"
              variant="tertiary"
            ></Button>
          </div>
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
