import React, { FC } from "react";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import { Heading, Icon } from "..";
import { data } from "@data/index";

const Sidebar: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Image
          className={styles.logo}
          alt="Kanban logo"
          width={132}
          height={21}
          src="/brand/logo.png"
        />
        <div className={styles.boardsContainer}>
          <div className={styles.title}>
            <Heading variant={4} title="ALL BOARDS (3)" />
          </div>

          <div className={styles.boards}>
            {data.boards.map(({ name }) => {
              return (
                <div className={styles.board} key={name}>
                  <Icon variant="board" />
                  <p>{name}</p>
                </div>
              );
            })}
            <div className={styles.board}>+ Create New Board</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default Sidebar;
