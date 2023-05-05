import React, { useState, useEffect, FC } from "react";
import { Icon } from "@components";
import styles from "./switch.module.scss";
import { motion } from "framer-motion";

const Switch: FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={toggleSwitch} className={styles.container}>
      <Icon variant="light" />
      <div data-ison={theme} className={styles.switchContainer}>
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
