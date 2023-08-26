import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./board.module.scss";
import { Column, Loading, Icon, Input } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import { useAddColumnMutation, useAddTaskMutation } from "state/api";
import { addColumnLocal, removeColumnLocal } from "state";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const { allBoards, activeBoard, user } = useSelector(
    (state: any) => state.global
  );

  const dispatch = useDispatch();
  const [addColumn] = useAddColumnMutation();
  const [isColumnBeingAdded, setIsColumnBeingAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columnName, setColumnName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    console.log("here1");

    if (inputRef && inputRef.current) {
      console.log("here2");
      inputRef.current.focus();
    }
  }, [inputRef]);

  const toggleAddColumn = () => {
    setIsColumnBeingAdded(true);
  };

  const handleStopCreatingColumn = () => {
    setIsColumnBeingAdded(false);
  };

  const handleError = (event: any) => {
    event.preventDefault();
    if (event.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setColumnName(e.target.value);
    handleError(e);
  };

  const handleColumnSubmit = async (e: any) => {
    const id = `newColumn-${Date.now()}`;
    const newColumn = {
      boardId: activeBoard._id,
      column: {
        name: columnName,
        tasks: [],
        _id: id,
      },
    };

    e.preventDefault();
    dispatch(addColumnLocal(newColumn));
    setIsColumnBeingAdded(false);

    try {
      const result = await addColumn({
        name: newColumn.column.name,
        // boardId: activeBoard._id,
      });

      if (result.error?.status === 500) {
        console.log(id);
        dispatch(removeColumnLocal({ boardId: activeBoard._id, columnId: id }));
        alert(
          "Something went wrong while adding a board, please try again later."
        );
      }
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

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
      {isLoading ? (
        <div className={styles.board}>
          <Loading />
        </div>
      ) : (
        <div className={styles.board}>
          {activeBoard?.columns?.map(({ name, tasks, _id }: ColumnProps) => {
            return <Column _id={_id} key={_id} name={name} tasks={tasks} />;
          })}
          {isColumnBeingAdded ? (
            <div className={styles.createColumnInputContainer}>
              <div className={styles.createColumnInput}>
                <form onSubmit={(e) => handleColumnSubmit(e)}>
                  <Input
                    inputRef={inputRef}
                    placeholder="Column Name"
                    onChange={handleChange}
                    error={error}
                  />
                </form>
                <div
                  onClick={handleStopCreatingColumn}
                  className={styles.delete}
                >
                  <Icon variant="close" height={14} width={14} />
                </div>
              </div>
            </div>
          ) : (
            <div onClick={toggleAddColumn} className={styles.newColumn}>
              <p className={styles.text}>+ New Column</p>
            </div>
          )}

          <div className={styles.empty}></div>
        </div>
      )}
    </div>
  );
};

export default Board;
