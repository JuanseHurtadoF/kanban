import React, { FC } from "react";
import { Sidebar, Nav } from "@components";
import styles from "./layout.module.scss";
import { Column } from "@components"; 
import { data } from "@data";
import Board from "@components/board";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div>
        <Nav />
        <Board />
      </div>
    </div>
  );
};

export default Layout;
