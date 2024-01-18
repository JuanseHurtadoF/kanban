import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBoardsQuery } from "state/api";
import { setBoards } from "state";
import { ObjectId } from "mongoose";

const useGetBoards = async () => {
  const user = useSelector((state: any) => state.global.user);
  const { data, loading } = await useGetBoardsQuery(user);

  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();

  const getBoards = async (user: ObjectId | string) => {
    try {
      dispatch(setBoards(data));
      setResult(data);
    } catch (error) {
      setError(error);
    }
  };

  return { getBoards, result, error, loading };
};

export default useGetBoards;
