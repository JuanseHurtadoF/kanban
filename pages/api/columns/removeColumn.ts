import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";
import Task from "@utils/models/Task";

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
      return res.status(500).json({
        success: false,
        message: "columnId and boardId are required fields",
      });
    }

    // Find the column
    // @ts-ignore
    const column = await Column.findById(columnId);
    if (!column) {
      return res
        .status(404)
        .json({ success: false, message: "Column not found" });
    }

    // Check if there are tasks in the column and delete them
    if (column.tasks && column.tasks.length > 0) {
      await Task.deleteMany({ _id: { $in: column.tasks } });
    }

    // Delete the column itself
    await Column.findByIdAndDelete(columnId);

    // Remove the columnId from the board
    // @ts-ignore
    await Board.findByIdAndUpdate(
      boardId,
      { $pull: { columns: columnId } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: `Column ${columnId} deleted` });
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({ success: false, message: error.message });
  }
}
