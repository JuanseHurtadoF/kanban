import React, { FC, useState } from "react";
import styles from "./createCard.module.scss";
import { CreateCardProps } from "@types";
import Heading from "@components/typography/headings";
import { Button, Dropdown, Icon, Input } from "@components";
import { subtask } from "@types";
import { useSelector } from "react-redux";
import useAddTask from "hooks/useAddTask";

const CreateCard: FC<CreateCardProps> = ({ onClick }) => {
  const { addNewTask } = useAddTask();

  const { user, activeBoard } = useSelector((state: any) => state.global);

  const [form, setForm] = useState({
    title: "",
    description: "",
    columnId: activeBoard?.columns[0]._id,
  });
  const [errors, setErrors] = useState({
    title: false,
  });
  const [subtaskArray, setSubtaskArray] = useState<subtask[]>([
    { title: "", isCompleted: false },
  ]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    if (event.target.value === "") {
      setErrors({
        ...errors,
        [event.target.name]: true,
      });
    } else {
      setErrors({
        ...errors,
        [event.target.name]: false,
      });
    }
  };

  const handleSubtaskChange = (event: any, index: number) => {
    event.preventDefault();

    const newArray: subtask[] = [...subtaskArray];
    newArray[index].title = event.target.value;
    setSubtaskArray(newArray);
  };

  const removeSubtask = (index: number) => {
    const newArray: subtask[] = [...subtaskArray];

    if (index === 0) newArray.shift();
    else if (index === newArray.length - 1) newArray.pop();

    setSubtaskArray(newArray);
  };

  const addSubtask = (event: any) => {
    event.preventDefault();

    event.stopPropagation();
    setSubtaskArray([...subtaskArray, { title: "", isCompleted: false }]);
  };

  const changeColumn = (id: string) => {
    setForm({
      ...form,
      columnId: id,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if title is empty
    if (form.title === "") {
      alert("Title can't be empty");
      return;
    }

    // Initialize variables
    const boardId = activeBoard._id;

    // check if subtask title is empty
    const newArray: subtask[] = [...subtaskArray];
    const filteredArray = newArray.filter((subtask) => subtask.title !== "");

    // create new task object
    const newTask = {
      title: form.title,
      description: form.description,
      board: boardId,
      column: form.columnId,
      _id: `newBoard-${Date.now()}`,
      user: user,
      subtasks: filteredArray,
    };

    // Close modal
    onClick(event);

    // Use hook
    const response = await addNewTask({
      boardId,
      columnId: form.columnId,
      task: newTask,
    });
  };

  return (
    <div onClick={onClick} className={styles.container}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={styles.modal}
      >
        <Heading variant={2} title="Add new task" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            title="Title"
            placeholder="e.g. Take coffee break"
            error={errors.title}
            errorMessage="Can't be empty"
            onChange={handleChange}
            value={form.title}
            name={"title"}
            focused
          />
          <Input
            title="Description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
            error={false}
            onChange={handleChange}
            value={form.description}
            name={"description"}
          />
          <div className={styles.addSubtask}>
            <p className={styles.title}>Subtasks</p>
            <div className={styles.list}>
              {subtaskArray.map((subtask, index) => {
                return (
                  <div key={index} className={styles.input}>
                    <Input
                      placeholder="e.g. Make coffee"
                      error={false}
                      onChange={(event) => handleSubtaskChange(event, index)}
                      onKeyUp={(event) => handleSubtaskChange(event, index)}
                      focused={index ? true : false}
                    />
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
              type="button"
              onClick={addSubtask}
              variant="secondary"
              label="+ Add New Subtask"
            />
          </div>
          <Dropdown
            title="Status"
            options={activeBoard?.columns?.map((column: any) => {
              return {
                name: column.name,
                id: column._id,
              };
            })}
            onChange={changeColumn}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="primaryLg"
            label="+ Add Task"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
