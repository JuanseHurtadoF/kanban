import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTaskLocal, removeTaskLocal, replaceTaskLocal } from "state";
import { useAddTaskMutation } from "state/api";
import { ObjectId } from "bson";

// Reminder: Make action to replace ID if API call succeeds

const useAddTask = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [addTask] = useAddTaskMutation();
  const dispatch = useDispatch();

  const addNewTask = async ({ boardId, columnId, task }) => {
    const objectId = new ObjectId();
    const newTaskId = objectId.toString();

    const subtasksWithId = task.subtasks.map((item) => {
      return {
        ...item,
        _id: new ObjectId().toString(),
      };
    });

    const newTask = { ...task, _id: newTaskId, subtasks: subtasksWithId };

    // Add in local state
    dispatch(addTaskLocal({ task: newTask, columnId }));

    const response = await addTask({ ...newTask });
    if (response?.error?.status === 500) {
      setError(response.error.status);
      alert(
        "Something went wrong while adding the task. Please try again later"
      );
      dispatch(removeTaskLocal({ boardId, columnId, taskId: newTaskId }));
      return;
    }
    dispatch(
      replaceTaskLocal({
        task: response.data.task,
        prevTask: newTask,
        columnId,
      })
    );
  };
  return { addNewTask, error, result };
};

export default useAddTask;
