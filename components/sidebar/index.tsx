import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo } from "@components";
import { SidebarProps } from "@types";
import {
  useAddBoardMutation,
  useGetBoardsQuery,
  useRemoveBoardMutation,
} from "state/api";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  const [newBoard, setNewBoard] = useState({
    name: "Testing",
    userId: "643da62416b35292cc2fee3d",
    columns: [],
  });

  const dispatch = useDispatch();
  const [addBoard] = useAddBoardMutation();
  const [removeBoard] = useRemoveBoardMutation();

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
      await removeBoard({ boardId: "6446a9aa850f3117d277a19f" });
      setNewBoard({ name: "", userId: "", columns: [] });
    } catch (error) {
      console.error("Error removing board:", error);
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
            <div onClick={handleSubmit} className={styles.board}>
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
