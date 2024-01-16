import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./board.module.scss";
import { Column, Loading, Icon, Input } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import useAddColumn from "hooks/useAddColumn";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const { allBoards, activeBoard, user } = useSelector(
    (state: any) => state.global
  );
  const { addNewColumn } = useAddColumn();
  const [isColumnBeingAdded, setIsColumnBeingAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columnName, setColumnName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const toggleAddColumn = () => {
    setIsColumnBeingAdded(true);
  };

  const handleStopCreatingColumn = () => {
    setIsColumnBeingAdded(false);
    setColumnName("");
    setError(false);
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
    e.preventDefault();
    if (columnName === "") {
      setError(true);
      return;
    }

    const newColumn: ColumnProps = {
      name: columnName,
      tasks: [],
      _id: `newColumn-${Date.now()}`,
    };

    // Handle column creation
    handleStopCreatingColumn();
    await addNewColumn({ boardId: activeBoard._id, column: newColumn });
  };

  useEffect(() => {
    // Fix later
    // Assuming that allBoards is always an array (either empty or with items)
    setIsLoading(false);
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
                    placeholder="Column Name"
                    onChange={handleChange}
                    error={error}
                    focused={true}
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
