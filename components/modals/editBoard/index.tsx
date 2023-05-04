import React, { FC, useEffect, useState } from "react";
import styles from "./editBoard.module.scss";
import { Heading, Button, Input } from "@components";
import { EditBoardProps } from "@types";
import { useSelector } from "react-redux";
import { useChangeBoardNameMutation } from "state/api";
import { useDispatch } from "react-redux";
import { changeBoardNameLocal } from "state";
import { on } from "events";

const EditBoard: FC<EditBoardProps> = ({ onClick }) => {
  const { name, _id } = useSelector((state: any) => state.global.activeBoard);
  const [boardName, setBoardName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [changeBoardName] = useChangeBoardNameMutation();
  const dispatch = useDispatch();

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
