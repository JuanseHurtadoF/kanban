import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";
import ts from "typescript";

type Data = {
  success?: boolean;
  message?: string;
  column?: object; // change later
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { columnId, source, destination } = req.body;
    const boardId = source.droppableId;

    console.log(boardId);

    if (!columnId || !source || !destination) {
      console.log("Missing body parameters");
      return res.status(500).json({ message: "Missing body parameters" });
    }

    // @ts-ignore
    const board = await Board.findById(boardId);

    console.log(board);

    const columns = board.columns;
    console.log(columns);
    const [removed] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, removed);
    const saved = await board.save();

    return res.status(200).json({ success: true, column: saved });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
