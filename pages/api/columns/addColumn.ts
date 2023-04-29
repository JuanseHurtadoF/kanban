import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";

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
    const { name, boardId } = req.body;

    // Create column

      const newColumn = new Column({ name, boardId });
      const saved = await newColumn.save();

    // Push column to columns array in Board
    const currentBoard = await Board.findOne({ _id: boardId });
    if (!currentBoard) {
      return res
        .status(404)
        .json({ success: false, message: "Board not found" });
    }

    currentBoard.columns.push(newColumn._id);
    currentBoard.markModified("columns"); // Mark columns array as modified
    await currentBoard.save();

    return res.status(200).json({
      success: true,
      message: "Column added successfully",
      column: {
        _id: newColumn._id,
        name: newColumn.name,
        tasks: newColumn.tasks,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
