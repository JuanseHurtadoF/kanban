import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditTaskMutation } from "state/api";
import { editTaskLocal } from "state";

const useEditTask = () => {
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const [editTask] = useEditTaskMutation();
  const taskId = useSelector((state: any) => state.global.highlightedCard._id);

  const updateTask = async ({ name, prevName, newDescription }) => {
    dispatch(editTaskLocal({ newName: name, newDescription }));
    const response = await editTask({
      title: name,
      taskId,
      description: newDescription,
    });
  };

  return { updateTask, result };
};

export default useEditTask;
