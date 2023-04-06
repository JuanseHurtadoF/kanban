import React, { FC } from "react";
import { Sidebar, Nav, Board, Icon } from "@components";
import styles from "./layout.module.scss";
import { useState } from "react";

const Layout: FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div
      className={
        isSideBarOpen
          ? `${styles.container}`
          : `${styles.container} ${styles.containerOnlyBoard}`
      }
    >
      {isSideBarOpen ? (
        <Sidebar toggleSidebar={toggleSidebar} />
      ) : (
        <div onClick={toggleSidebar} className={styles.open}>
          <Icon variant="open" fill="#fff" />
        </div>
      )}
      <div>
        <Nav />
        <Board />
      </div>
    </div>
  );
};

export default Layout;
