import React from "react";
import { Icon } from "@components";
import styles from "./switch.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const Switch = () => {
  const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>(false);

  const toggleSwitch = () => {
    setIsDarkModeOn(!isDarkModeOn);
  };

  return (
    <div onClick={toggleSwitch} className={styles.container}>
      <Icon variant="light" />
      <div data-isOn={isDarkModeOn} className={styles.switchContainer}>
        <motion.div
          transition={{ duration: 0.1, ease: "easeOut" }}
          layout
          className={styles.switch}
        />
      </div>
      <Icon variant="dark" />
    </div>
  );
};

export default Switch;
