import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTaskLocal, removeTaskLocal, replaceTaskLocal } from "state";
import { useAddTaskMutation } from "state/api";

// Reminder: Make action to replace ID if API call succeeds

const useAddTask = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [addTask] = useAddTaskMutation();
  const dispatch = useDispatch();

  const addNewTask = async ({ boardId, columnId, task }) => {
    // Add in local state
    dispatch(addTaskLocal({ task }));

    const response = await addTask({ ...task });
    if (response?.error?.status === 500) {
      setError(response.error.status);
      alert(
        "Something went wrong while adding the task. Please try again later"
      );
      dispatch(removeTaskLocal({ boardId, columnId, taskId: task._id }));
      return;
    }
    dispatch(
      replaceTaskLocal({ task: response.data.task, prevTask: task, columnId })
    );
  };
  return { addNewTask, error, result };
};

export default useAddTask;
