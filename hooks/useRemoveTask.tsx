import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveTaskMutation } from "state/api";
import { RemoveTaskProps } from "@types";
import { addTaskLocal, removeTaskLocal } from "state";

const useRemoveTask = () => {
  const boardId = useSelector((state: any) => state.global.activeBoard._id);

  const [result, setResult] = useState(null);

  const [removeTask] = useRemoveTaskMutation();

  const dispatch = useDispatch();

  const deleteTask = async ({ columnId, taskId, prevTask }: any) => {
    // remove task from local state
    dispatch(removeTaskLocal({ boardId, columnId, taskId }));

    // remove task from DB
    const response = await removeTask({ taskId, columnId });

    // // Handle error
    if (response.error?.status === 500) {
      dispatch(
        addTaskLocal({ task: prevTask, columnId })
      );
      alert(
        "Something went wrong while deleting the your task, please try again later."
      );
    }
  };

  return { deleteTask, result };
};

export default useRemoveTask;
