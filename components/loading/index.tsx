import React, { FC, useEffect, useState } from "react";
import styles from "./loading.module.scss";
import { motion } from "framer-motion";

const Loading: FC = () => {
  const [activeBar, setActiveBar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBar((prev) => (prev === 2 ? 0 : prev + 1));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div
          className={
            activeBar === 0
              ? `${styles.bar} ${styles.barActive}`
              : `${styles.bar}`
          }
        ></div>
        <div
          className={
            activeBar === 1
              ? `${styles.bar} ${styles.barActive}`
              : `${styles.bar}`
          }
        ></div>
        <div
          className={
            activeBar === 2
              ? `${styles.bar} ${styles.barActive}`
              : `${styles.bar}`
          }
        ></div>
      </div>
    </div>
  );
};

export default Loading;
