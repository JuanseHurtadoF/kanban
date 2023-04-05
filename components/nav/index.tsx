import React, { FC } from "react";
import { Heading, Button, Icon } from "@components";
import styles from "./nav.module.scss";

const Nav: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <Heading title="Platform Launch" variant={1} />
      </div>
      <div className={styles.actionsContainer}>
        <Button
          label="+ Add New Task"
          variant="primarySm"
          onClick={() => console.log("I'll create a task")}
        />
        <div className={styles.options}>
          <Icon variant="options" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
