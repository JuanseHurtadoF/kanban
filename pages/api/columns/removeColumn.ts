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
    const { columnId, boardId } = req.body;

    // Handle missing information
    if (!columnId || !boardId) {
      return res.status(400).json({
        success: false,
        message: "columnId and boardId are required fields",
      });
    }

    // Delete column
    const column = await Column.findByIdAndDelete(columnId);
    // @ts-ignore
    const board = await Board.findByIdAndUpdate(
      boardId,
      { $pull: { boards: boardId } },
      { new: true }
    );
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
