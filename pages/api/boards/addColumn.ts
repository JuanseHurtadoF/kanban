import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import User from "@utils/models/User";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { name, boardId } = req.body;

    const newColumn = {
      name,
      tasks: [],
    };

    // Push column to columns array in Board
    const board = await Board.findByIdAndUpdate(
      boardId,
      { $push: { columns: newColumn } },
      { new: true }
    );

    return res.status(200).json({ name });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
