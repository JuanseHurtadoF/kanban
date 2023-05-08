import React, { FC, useEffect, useState } from "react";
import styles from "./board.module.scss";
import { Column, Loading } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Board: FC<BoardProps> = ({ fullWidth, toggleEditBoard }) => {
  const { allBoards, activeBoard } = useSelector((state: any) => state.global);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allBoards.length > 0) setIsLoading(false);
  }, [allBoards]);

  return (
    <div
      className={
        fullWidth
          ? `${styles.container} ${styles.containerFullWidth}`
          : `${styles.container}`
      }
    >
      <Droppable direction="horizontal" droppableId="board" type="columns">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.board}
          >
            {activeBoard?.columns?.map(
              ({ name, tasks, _id }: ColumnProps, index: number) => {
                return (
                  <Draggable draggableId={_id} index={index} key={_id}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Column _id={_id} name={name} tasks={tasks} />
                      </div>
                    )}
                  </Draggable>
                );
              }
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div onClick={toggleEditBoard} className={styles.newColumn}>
        <p className={styles.text}>+ New Column</p>
      </div>
      <div className={styles.empty}></div>
    </div>
  );
};

export default Board;
