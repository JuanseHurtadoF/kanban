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
    const { name, columns, userId } = req.body;

    // Create board
    const board = new Board({ name, columns, user: userId });
    const result = await board.save();

    // Add board to user
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { boards: board._id } },
      { new: true }
    );

    return res.status(200).json({ name });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
