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
    const { name, userId, columns } = req.body;

    // Create board
    const board = new Board({ name, columns, user: userId });
    const result = await board.save();

    // Add board to user
    // @ts-ignore
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { boards: board._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      board: {
        _id: board._id,
        name: board.name,
        user: board.user,
        columns: board.columns,
      },
    });
  } catch (error: any) {
    console.error("Error in handler:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
