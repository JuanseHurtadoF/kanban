import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo, Input, Board } from "@components";
import { SidebarProps } from "@types";
import { setBoards, addBoardLocal, removeBoardLocal } from "state";
import { useAddBoardMutation, useGetBoardsQuery } from "state/api";
import axios from "axios";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  // States for data
  const { data } = useGetBoardsQuery("Board");
  const allBoards = useSelector((state: any) => state.global.allBoards);
  const userId = useSelector((state: any) => state.global.currentUser);

  // States for adding board
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState(false);
  const [isBoardBeingAdded, setIsBoardBeingAdded] = useState(false);

  // State management configuration
  const dispatch = useDispatch();
  const [addBoard] = useAddBoardMutation();

  // Set boards in global state
  useEffect(() => {
    dispatch(setBoards(data?.boards));
  }, [data]);

  // Functionality for adding a board
  const handleChange = (event: any) => {
    event.preventDefault();
    setBoardName(event.target.value);
    handleError(event)
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
    setError(false)
  };

  const handleNewBoard = async (event: any) => {
    event.preventDefault();

    const id = `newBoard-${Date.now()}`;
    const newBoard = {
      name: boardName,
      userId: userId,
      columns: [],
      id,
    };
    dispatch(addBoardLocal(newBoard));
    setIsBoardBeingAdded(false);
    handleStopCreatingBoard(event);
    try {
      const result = await addBoard(newBoard);
      dispatch(removeBoardLocal(id));
    } catch (error) {
      console.error("Error adding board:", error);
    }
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
              title={`ALL BOARDS (${!data ? "0" : allBoards?.length})`}
            />
          </div>

          <div className={styles.boards}>
            {allBoards?.map(({ name, _id }: any) => {
              return (
                <div
                  onClick={() => console.log(_id)}
                  className={styles.board}
                  key={name}
                >
                  <Icon variant="board" />
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
                  />
                </form>
                <div
                  onClick={handleStopCreatingBoard}
                  className={styles.delete}
                >
                  <Icon variant="delete" height={20} width={20} />
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
