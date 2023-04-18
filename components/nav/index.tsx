import React, { FC } from "react";
import { Heading, Button, Icon } from "@components";
import styles from "./nav.module.scss";
import { NavProps } from "@types";
import axios from "axios";

const Nav: FC<NavProps> = ({ onClick }) => {
  const addBoard = async () => {
    const board = await axios.post("/api/boards/addBoard", {
      name: "New Board 2",
      columns: [],
      userId: "643d9f7c16b35292cc2fee30",
    });
  };

  const addUser = async () => {
    const user = await axios.post("/api/users/addUser", {
      name: "Tito",
      email: "tito@gmail.com",
      password: "1234",
      boards: [],
      role: "admin",
    });
  };

  const addTask = async () => {
    const task = await axios.post("/api/tasks/addTask", {
      title: "THIS IS A TASK",
      description: "THIS IS A TASK",
      status: "todo",
      column: "643da95616b35292cc2fee45",
      subtasks: [],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <Heading title="Platform Launch" variant={1} />
      </div>
      <div className={styles.actionsContainer}>
        <Button label="+ Add New Task" variant="primarySm" onClick={addBoard} />
        <div className={styles.options}>
          <Icon variant="options" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
