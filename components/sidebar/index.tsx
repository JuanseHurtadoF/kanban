import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo } from "@components";
import { SidebarProps } from "@types";
import {
  useAddBoardMutation,
  useGetBoardsQuery,
  useRemoveBoardMutation,
  useAddColumnMutation,
  useRemoveColumnMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
} from "state/api";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  const [newBoard, setNewBoard] = useState({
    name: "Platform Launch",
    userId: "643da62416b35292cc2fee3d",
    columns: [],
  });

  const dispatch = useDispatch();
  const [addBoard] = useAddBoardMutation();
  const [removeBoard] = useRemoveBoardMutation();
  const [addColumn] = useAddColumnMutation();
  const [removeColumn] = useRemoveColumnMutation();
  const [addTask] = useAddTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await addBoard(newBoard);
      setNewBoard({ name: "", userId: "", columns: [] });
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const handleRemove = async (event: any) => {
    event.preventDefault();
    try {
      await removeBoard({ boardId: "644069afee7daffb5b16713f" });
      setNewBoard({ name: "", userId: "", columns: [] });
    } catch (error) {
      console.error("Error removing board:", error);
    }
  };

  const handleNewColumn = async (event: any) => {
    event.preventDefault();
    try {
      await addColumn({
        name: "Done",
        boardId: "64482c16850f3117d277a3d7",
        tasks: [],
      });
    } catch (error: any) {
      console.error("Error adding column:", error.message);
    }
  };

  const handleRemoveColumn = async (event: any) => {
    event.preventDefault();
    try {
      await removeColumn({
        columnId: "6447fac8850f3117d277a1e8",
        boardId: "6447f4d1850f3117d277a1bc",
      });
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleNewTask = async (event: any) => {
    event.preventDefault();
    try {
      await addTask({
        title: "Build UI for onboarding flow",
        description: "Consult with design team for any doubts.",
        subtasks: [],
        user: "643da62416b35292cc2fee3d",
        column: "6447fa79850f3117d277a1d8",
        board: "6447f4d1850f3117d277a1bc",
      });
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleRemoveTask = async (event: any) => {
    event.preventDefault();
    try {
      await removeTask({
        columnId: "6447fa79850f3117d277a1d8",
        taskId: "644800d1850f3117d277a2f1",
      });
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  };

  const { data } = useGetBoardsQuery("Board");

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.boardsContainer}>
          <div className={styles.title}>
            <Heading
              variant={4}
              title={`ALL BOARDS (${!data ? "0" : data?.boards.length})`}
            />
          </div>

          <div className={styles.boards}>
            {data?.boards.map(({ name }: any) => {
              return (
                <div className={styles.board} key={name}>
                  <Icon variant="board" />
                  <p>{name}</p>
                </div>
              );
            })}
            <div onClick={handleNewColumn} className={styles.board}>
              + Create New Board
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Switch />
        <div onClick={toggleSidebar} className={styles.close}>
          <Icon variant="hide" />
          <Text text="Hide sidebar" variant="tertiary" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
