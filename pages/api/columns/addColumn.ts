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

    // Handle missing information
    if (!name || !boardId) {
      return res.status(400).json({
        success: false,
        message: "Name and boardId are required fields",
      });
    }

    // Create column
    const newColumn = new Column({ name, boardId, tasks: [] });
    const saved = await newColumn.save();

    // Push column to columns array in Board
    const currentBoard = await Board.findByIdAndUpdate(
      boardId,
      { $push: { columns: newColumn._id._id } },
      { new: true }
    );

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
