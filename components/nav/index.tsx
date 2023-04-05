import React, { FC } from "react";
import { Heading, Button } from "@components";
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
          <svg
            width="5"
            height="20"
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Nav;
