import { useRemoveSubtasksMutation } from "state/api";
import { removeSubtaskLocal } from "state";
import { useDispatch } from "react-redux";

const useSubtaskActions = () => {
  const [removeSubtasks] = useRemoveSubtasksMutation();
  const dispatch = useDispatch();

  const deleteSubtask = ({ subtaskId }) => {
    dispatch(removeSubtaskLocal({ subtaskId }));
    removeSubtasks({ subtaskId });
  };

  return { deleteSubtask };
};

export default useSubtaskActions;
