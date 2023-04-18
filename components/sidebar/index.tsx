import React, { FC } from "react";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo } from "@components";
import { dataTest } from "@data/index";
import { SidebarProps } from "@types";
import { useGetBoardsQuery } from "state/api";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {

  // const { data, isLoading, error } = useGetBoardsQuery("boards");

  const addBoard = async () => {
    useGetBoardsQuery;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.boardsContainer}>
          <div className={styles.title}>
            <Heading variant={4} title="ALL BOARDS (3)" />
          </div>

          <div className={styles.boards}>
            {dataTest?.boards.map(({ name }: any) => {
              return (
                <div className={styles.board} key={name}>
                  <Icon variant="board" />
                  <p>{name}</p>
                </div>
              );
            })}
            <div onClick={addBoard} className={styles.board}>
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
