import { useDispatch, useSelector } from "react-redux";
import { moveColumnLocal } from "state";
import { useReorderColumnMutation } from "state/api";

const useReorderColumns = () => {
  const dispatch = useDispatch();
  const [reorderColumn] = useReorderColumnMutation();
  const { _id } = useSelector((state: any) => state.global.activeBoard);

  const handleReorderColumn = async (destination, source, draggableId) => {
    dispatch(
      moveColumnLocal({
        source,
        destination,
        columnId: draggableId,
      })
    );
    reorderColumn({ columnId: draggableId, source, destination });
  };

  return { handleReorderColumn };
};

export default useReorderColumns;
