import React, { FC } from "react";
import { Sidebar, Nav } from "@components";
import styles from "./layout.module.scss";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div>
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
