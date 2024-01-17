import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditTaskMutation } from "state/api";

const useEditTask = () => {
  const boardId = useSelector((state: any) => state.global.activeBoard._id);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const [editTask] = useEditTaskMutation();
  const taskId = useSelector((state: any) => state.global.highlightedCard._id);

  const updateTask = async ({ name, prevName }) => {
    const response = await editTask({
      title: name,
      taskId,
    });
  };

  return { updateTask, result };
};

export default useEditTask;
