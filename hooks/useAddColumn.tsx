import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAddColumnMutation } from "state/api";
import { AddColumnProps } from "@types";
import { addColumnLocal, removeColumnLocal, replaceColumnLocal } from "state";

const useAddColumn = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [addColumn] = useAddColumnMutation();

  const dispatch = useDispatch();

  const addNewColumn = async ({ boardId, column }: AddColumnProps) => {
    // Add in local state
    dispatch(addColumnLocal({ boardId, column }));

    // Add in DB
    const response = await addColumn({ boardId, name: column.name });
    if (response?.error?.status === 500) {
      setError(response.error.status);
      alert(
        "Something went wrong while adding the column. Please try again later"
      );
      dispatch(removeColumnLocal({ boardId, columnId: column._id }));
      return;
    }

    // Update local state with id from DB
    dispatch(
      replaceColumnLocal({
        boardId,
        column: response.data.column,
        prevColumn: column,
      })
    );

    return response;
  };

  return { addNewColumn, error, result };
};

export default useAddColumn;
