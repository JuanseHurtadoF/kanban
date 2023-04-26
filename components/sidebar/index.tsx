import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./sidebar.module.scss";
import { Heading, Text, Icon, Switch, Logo } from "@components";
import { SidebarProps } from "@types";
import { setBoards, addBoardLocal, removeBoardLocal } from "state";
import { useAddBoardMutation, useGetBoardsQuery } from "state/api";

const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  // const [newBoard, setNewBoard] = useState({
  //   name: "Testing",
  //   userId: "643da62416b35292cc2fee3d",
  //   columns: [],
  // });

  const dispatch = useDispatch();
  const [addBoard] = useAddBoardMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const id = `newBoard-${Date.now()}`;
    const newBoard = {
      name: "Testing Hello",
      userId: "643da62416b35292cc2fee3d",
      columns: [],
      id,
    };

    dispatch(addBoardLocal(newBoard));
    try {
      const result = await addBoard(newBoard);
      dispatch(removeBoardLocal(id));
      // dispatch(addBoardLocal(result));
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const { data } = useGetBoardsQuery("Board");

  const allBoards = useSelector((state: any) => state.global.allBoards);

  useEffect(() => {
    dispatch(setBoards(data?.boards));
  }, [data]);

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
              title={`ALL BOARDS (${!data ? "0" : data?.boards.length})`}
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
            <div onClick={handleSubmit} className={styles.board}>
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
