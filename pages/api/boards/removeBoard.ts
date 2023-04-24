import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import User from "@utils/models/User";
import Board from "@utils/models/Board";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { boardId } = req.body;

    const board = await Board.findById(boardId);

    console.log(board);

    if (!board) {
      return res
        .status(404)
        .json({ success: false, message: "Board not found" });
    }

    // Remove board reference from user
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
