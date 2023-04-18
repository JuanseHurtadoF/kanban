import React, { FC, useEffect } from "react";
import { Sidebar, Nav, Board, Icon, CardInfo, Button } from "@components";
import styles from "./layout.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CardProps, RootState } from "@types";
import CreateCard from "@components/modals/createCard";
import axios from "axios";

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

  const toggleNewCard = () => {
    setIsTaskCreationOpen(!isTaskCreationOpen);
  };
  
  return (
    <div
      className={
        isSideBarOpen
          ? `${styles.container}`
          : `${styles.container} ${styles.containerOnlyBoard}`
      }
    >
      {/* Sidebar */}
      {isSideBarOpen ? (
        <Sidebar toggleSidebar={toggleSidebar} />
      ) : (
        <div onClick={toggleSidebar} className={styles.open}>
          <Icon variant="open" fill="#fff" />
        </div>
      )}

      {/* Modals */}
      {isCardInfoOpen && <CardInfo onClick={toggleCardInfo} />}
      {isTaskCreationOpen && <CreateCard onClick={toggleNewCard} />}

      {/* Board */}
      <div>
        <Nav onClick={toggleNewCard} />
        <Board fullWidth={isSideBarOpen ? false : true} />
      </div>
    </div>
  );
};

export default Layout;
