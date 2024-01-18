import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo, Input } from "@components";
import { SidebarProps } from "@types";
import {
  setBoards,
  setActiveBoard,
  addBoardLocal,
  removeBoardLocal,
} from "state";
import { useAddBoardMutation } from "state/api";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  const { allBoards, user, activeBoard } = useSelector(
    (state: any) => state.global
  );

  // States for adding board
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState(false);
  const [isBoardBeingAdded, setIsBoardBeingAdded] = useState(false);

  // State management configuration
  const dispatch = useDispatch();
  const [addBoard] = useAddBoardMutation();  

  // Functionality for adding a board
  const handleChange = (event: any) => {
    event.preventDefault();
    setBoardName(event.target.value);
    handleError(event);
  };

  const handleError = (event: any) => {
    event.preventDefault();
    if (event.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleStopCreatingBoard = (event: any) => {
    event.preventDefault();
    setIsBoardBeingAdded(false);
    setBoardName("");
    setError(false);
  };

  const handleNewBoard = async (event: any) => {
    event.preventDefault();

    const id = `newBoard-${Date.now()}`;
    const newBoard = {
      name: boardName,
      userId: user,
      columns: [],
      _id: id,
    };
    dispatch(addBoardLocal(newBoard));
    setIsBoardBeingAdded(false);
    handleStopCreatingBoard(event);
    try {
      const result = await addBoard(newBoard);
      if (result.error?.status === 500) {
        dispatch(removeBoardLocal(id));
        alert(
          "Something went wrong while adding a board, please try again later."
        );
      }
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const changeActiveBoard = (id: string) => {
    dispatch(setActiveBoard(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.boardsContainer}>
          <div className={styles.title}>
            <Heading
              variant={4}
              title={`ALL BOARDS (${allBoards?.length})`}
            />
          </div>

          <div className={styles.boards}>
            {allBoards?.map(({ name, _id }: any) => {
              const isActive = _id === activeBoard?._id;
              return (
                <div
                  onClick={() => changeActiveBoard(_id)}
                  className={
                    isActive
                      ? `${styles.board} ${styles.boardActive}`
                      : `${styles.board}`
                  }
                  key={name}
                >
                  <Icon variant="board" fill={isActive ? `#fff` : `#000`} />
                  <p>{name}</p>
                </div>
              );
            })}
            {isBoardBeingAdded && (
              <div className={styles.createBoardInput}>
                <form onSubmit={handleNewBoard}>
                  <Input
                    onChange={handleChange}
                    value={boardName}
                    placeholder="Name"
                    error={error}
                    errorMessage="Can't be empty"
                    focused
                  />
                </form>
                <div
                  onClick={handleStopCreatingBoard}
                  className={styles.delete}
                >
                  <Icon variant="close" height={14} width={14} />
                </div>
              </div>
            )}
            <div
              onClick={() => setIsBoardBeingAdded(true)}
              className={styles.board}
            >
              + Create New Board
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Switch />
        <div onClick={toggleSidebar} className={styles.close}>
          <Icon variant="hide" />
          <Text text="Hide sidebar" variant="tertiary" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
