import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./board.module.scss";
import { Column, Loading, Icon, Input } from "@components";
import { ColumnProps, BoardProps } from "@types";
import { useSelector, useDispatch } from "react-redux";
import useAddColumn from "hooks/useAddColumn";
import { useGetBoardsQuery } from "state/api";
import { setBoards } from "state";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Board: FC<BoardProps> = ({ fullWidth }) => {
  const { activeBoard } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();

  const { data, isLoading } = useGetBoardsQuery();

  const { addNewColumn } = useAddColumn();
  const [isColumnBeingAdded, setIsColumnBeingAdded] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const droppableId = activeBoard?._id || "fallback-board-id";

  useEffect(() => {
    if (!data) return;
    dispatch(setBoards(data?.boards));
  }, [data]);

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
        <Droppable
          direction="horizontal"
          droppableId={droppableId}
          type="columns"
        >
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.board}
              >
                {activeBoard?.columns?.map(
                  ({ name, tasks, _id }: ColumnProps, index) => {
                    const draggableId = _id.toString();
                    return (
                      <Draggable
                        index={index}
                        draggableId={draggableId}
                        key={draggableId}
                      >
                        {(provided) => {
                          return (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <Column
                                _id={_id}
                                key={draggableId}
                                name={name}
                                tasks={tasks}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      )}
      <div>
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
              <div onClick={handleStopCreatingColumn} className={styles.delete}>
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
    </div>
  );
};

export default Board;
