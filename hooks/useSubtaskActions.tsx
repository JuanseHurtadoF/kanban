import { useRemoveSubtasksMutation } from "state/api";
import { removeSubtaskLocal } from "state";
import { useDispatch } from "react-redux";
import { useEditSubtaskMutation, useAddSubtaskMutation } from "state/api";
import { editSubtaskLocal } from "state";
import { ObjectId } from "bson";
import { useSelector } from "react-redux";
import { addSubtaskLocal } from "state";

const useSubtaskActions = () => {
  const [removeSubtasks] = useRemoveSubtasksMutation();
  const [editSubtask] = useEditSubtaskMutation();
  const dispatch = useDispatch();
  const highlightedCard = useSelector(
    (state: any) => state.global.highlightedCard
  );
  const [addSubtask] = useAddSubtaskMutation();

  const deleteSubtask = ({ subtaskId }) => {
    dispatch(removeSubtaskLocal({ subtaskId }));
    removeSubtasks({ subtaskId });

    // handle errors later
  };

  const editSubtaskName = ({ subtaskId, newTitle }) => {
    editSubtask({ subtaskId, newTitle });
    dispatch(editSubtaskLocal({ subtaskId, newTitle }));
  };

  const addNewSubtask = ({ newTitle }) => {
    const newSubtaskId = new ObjectId();

    dispatch(
      addSubtaskLocal({ title: newTitle, subtaskId: newSubtaskId.toString() })
    );
    addSubtask({
      subtaskId: newSubtaskId,
      subtaskTitle: newTitle,
      taskId: highlightedCard._id,
    });
  };

  return { deleteSubtask, editSubtaskName, addNewSubtask };
};

export default useSubtaskActions;
