import { EditBoardNameProps } from "@types";
import { useChangeBoardNameMutation } from "state/api";

const editBoardName = async ({ boardId, name }: EditBoardNameProps) => {
  const response = await fetch("/api/boards/changeBoardName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardId, name }),
  });

  const data = await response.json();

  return data;
};

export default editBoardName;