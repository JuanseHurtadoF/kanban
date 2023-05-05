import React, { FC, useEffect } from "react";
import { Sidebar, Nav, Board, Icon, CardInfo, Button } from "@components";
import styles from "./layout.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CardProps, RootState } from "@types";
import { CreateCard, DeleteBoard } from "@components";
import axios from "axios";
import EditBoard from "@components/modals/editBoard";

const Layout: FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isCardInfoOpen, setIsCardInfoOpen] = useState<boolean>(false);
  const [isTaskCreationOpen, setIsTaskCreationOpen] = useState<boolean>(false);
  const [isDeleteBoardOpen, setIsDeleteBoardOpen] = useState<boolean>(false);
  const [isEditBoardOpen, setIsEditBoardOpen] = useState<boolean>(false);

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

  const toggleDeleteModal = () => {
    setIsDeleteBoardOpen(!isDeleteBoardOpen);
  };

  const toggleEditBoard = () => {
    setIsEditBoardOpen(!isEditBoardOpen);
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
      {isDeleteBoardOpen && <DeleteBoard onClick={toggleDeleteModal} />}
      {isEditBoardOpen && <EditBoard onClick={toggleEditBoard} />}

      {/* Board */}
      <div>
        <Nav
          toggleDeleteModal={toggleDeleteModal}
          toggleNewCard={toggleNewCard}
        />
        <Board
          toggleEditBoard={toggleEditBoard}
          fullWidth={isSideBarOpen ? false : true}
        />
      </div>
    </div>
  );
};

export default Layout;
