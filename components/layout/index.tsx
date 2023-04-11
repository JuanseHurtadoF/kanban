import React, { FC, useEffect } from "react";
import { Sidebar, Nav, Board, Icon, CardInfo } from "@components";
import styles from "./layout.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CardProps, RootState } from "@types";

const Layout: FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isCardInfoOpen, setIsCardInfoOpen] = useState<boolean>(false);
  const [isTaskCreationOpen, setIsTaskCreationOpen] = useState<boolean>(false);

  const highlightedCard: CardProps = useSelector(
    (state: RootState) => state.global.highlightedCard
  );

  useEffect(() => {
    setIsCardInfoOpen((prev: boolean) => !prev);
  }, [highlightedCard]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const toggleCardInfo = () => {
    setIsCardInfoOpen(!isCardInfoOpen);
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

      {isCardInfoOpen && <CardInfo onClick={toggleCardInfo} />}

      <div>
        <Nav />
        <Board />
      </div>
    </div>
  );
};

export default Layout;
