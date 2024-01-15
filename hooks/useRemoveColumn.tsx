import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveColumnMutation } from "state/api";
import { RemoveColumnProps } from "@types";
import { addColumnLocal, removeColumnLocal } from "state";

const useRemoveColumn = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [removeColumn] = useRemoveColumnMutation();
  const board = useSelector((state: any) => state.global.activeBoard);

  const dispatch = useDispatch();

  const deleteColumn = async ({ boardId, columnId }: RemoveColumnProps) => {
    // Save column before deletion (for undo)
    const column = board.columns.find((column: any) => column.id === columnId);

    // Remove in local state
    dispatch(removeColumnLocal({ boardId, columnId }));

    // Remove in DB
    const response = await removeColumn({ boardId, columnId });
    setResult(response);

    // Handle error
    if (response.error?.status === 500) {
      setError(response.error.data.message);
      alert(
        "Something went wrong while deleting the your column, please try again later."
      );
    }
  };

  return { deleteColumn, error, result };
};

export default useRemoveColumn;
