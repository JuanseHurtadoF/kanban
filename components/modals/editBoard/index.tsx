import React, { FC, useEffect, useState } from "react";
import styles from "./editBoard.module.scss";
import { Heading, Button, Input, Icon } from "@components";
import { EditBoardProps } from "@types";
import { useSelector } from "react-redux";
import { useChangeBoardNameMutation, useAddColumnMutation } from "state/api";
import { useDispatch } from "react-redux";
import { changeBoardNameLocal, addColumnLocal, removeColumnLocal } from "state";

const EditBoard: FC<EditBoardProps> = ({ onClick }) => {
  const { name, _id, columns } = useSelector(
    (state: any) => state.global.activeBoard
  );
  const [boardName, setBoardName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [changeBoardName] = useChangeBoardNameMutation();
  const [addColumn] = useAddColumnMutation();

  const dispatch = useDispatch();

  const handleNewColumn = async () => {
    const boardId = _id;
    const id = `newBoard-${Date.now()}`;

    const newColumn = {
      name: "Done",
      tasks: [],
      _id: id,
    };

    dispatch(addColumnLocal({ column: newColumn, boardId }));

    try {
      const result = await addColumn({
        name: newColumn.name,
        boardId,
      });
      if (result.error?.status === 500) {
        dispatch(removeColumnLocal({ boardId, columnId: id }));
        alert(
          "Something went wrong while adding a column, please try again later."
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    setBoardName(event.target.value);

    if (event.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleBoardNameChange = async (event: any) => {
    const prevName = name;

    event.preventDefault();
    dispatch(changeBoardNameLocal({ name: boardName, boardId: _id }));
    onClick();

    try {
      const result = await changeBoardName({
        name: boardName,
        boardId: _id,
      });
      console.log(result);
      if (result.error?.status === 500) {
        dispatch(changeBoardNameLocal({ name: prevName, boardId: _id }));
        alert(
          "Something went wrong while adding changing the board name, please try again later."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: any) => {
    if (boardName === "") {
      alert("Board name can't be empty");
      return;
    }

    if (boardName !== name) {
      handleBoardNameChange(event);
    }
    onClick();
  };

  useEffect(() => {
    if (!name) return;
    setBoardName(name);
  }, [name]);

  return (
    <div onClick={onClick} className={styles.container}>
      <div onClick={(e: any) => e.stopPropagation()} className={styles.modal}>
        <Heading variant={3} title="Edit board" />
        <form className={styles.form}>
          <Input
            onChange={handleChange}
            value={boardName}
            title="Board name"
            placeholder="e.g. Doing"
            error={error}
            errorMessage="Can't be empty"
          />
          <div className={styles.list}>
            <p className={styles.title}>Columns</p>
            {columns?.map((column: any, index: number) => {
              return (
                <div key={index} className={styles.input}>
                  <Input
                    placeholder="e.g. Make coffee"
                    error={false}
                    value={column?.name}
                    onChange={(event) => console.log("close")}
                  />
                  <div
                    // onClick={() => removeSubtask(index)}
                    className={styles.close}
                  >
                    <Icon variant="close" />
                  </div>
                </div>
              );
            })}
            <Button
              variant="secondary"
              label="Add column"
              onClick={() => console.log("add column")}
            />
          </div>
        </form>
        <div className={styles.buttons}>
          <Button
            variant="primaryLg"
            label="Save Changes"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBoard;
