import React, { FC, useEffect, useState } from "react";
import styles from "./createCard.module.scss";
import { CreateCardProps } from "@types";
import Heading from "@components/typography/headings";
import { Button, Dropdown, Icon, Input } from "@components";
import { subtask } from "@types";
import { useAddTaskMutation } from "state/api";
import { useSelector } from "react-redux";

const CreateCard: FC<CreateCardProps> = ({ onClick }) => {
  // Get user and board info from global state
  const { user, activeBoard } = useSelector((state: any) => state.global);

  // Define form, error and subtasks array
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

  // Import mutations
  const [addTask] = useAddTaskMutation();

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

  const handleSubmit = (event: any) => {
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
      user: user,
      subtasks: filteredArray,
    };

    // add task to database
    addTask(newTask);
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

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
            error={errors.title}
            errorMessage="Can't be empty"
            onChange={handleChange}
            value={form.title}
            name={"title"}
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
