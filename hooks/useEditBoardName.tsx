import { useEffect, useState } from "react";
import { EditBoardNameProps } from "@types";
// import editBoardName from "@utils/lib/board/editBoardName";
import { useDispatch } from "react-redux";
import { changeBoardNameLocal } from "state";
import { useChangeBoardNameMutation } from "state/api";

const useEditBoardName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();
  const [changeBoardName] = useChangeBoardNameMutation();

  const updateBoardName = async ({
    boardId,
    name,
    prevName,
  }: EditBoardNameProps) => {
    setIsLoading(true);
    setError(null);

    dispatch(changeBoardNameLocal({ boardId, name, prevName }));
    const response = await changeBoardName({ boardId, name });
    setResult(response);

    // Handle error
    if (response.error?.status === 500) {
      dispatch(changeBoardNameLocal({ boardId, name: prevName }));
      setError(response.error.status);
      setIsLoading(false);
      alert(
        "Something went wrong while updating your board name, please try again later."
      );
      return;
    }
    setIsLoading(false);
  };

  return { updateBoardName, isLoading, error, result };
};

export default useEditBoardName;
