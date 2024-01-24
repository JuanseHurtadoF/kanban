import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import User from "@utils/models/User";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";
import Task from "@utils/models/Task";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { boardId } = req.body;

    // @ts-ignore
    const board = await Board.findById(boardId);

    if (board.columns && board.columns.length > 0) {
      await Task.deleteMany({ board: boardId });
      await Column.deleteMany({ _id: { $in: board.columns } });
    }

    if (!board) {
      return res
        .status(400)
        .json({ success: false, message: "Board not found" });
    }

    // Remove board reference from user
    // @ts-ignore
    const user = await User.findByIdAndUpdate(
      board.user,
      { $pull: { boards: board._id } },
      { new: true }
    );

    // Remove board
    const removedBoard = await Board.findByIdAndDelete(boardId);

    return res.status(200).json({
      success: true,
      message: "Board deleted",
      board: {
        _id: board._id,
        name: board.name,
        user: board.user,
        columns: board.columns,
      },
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
