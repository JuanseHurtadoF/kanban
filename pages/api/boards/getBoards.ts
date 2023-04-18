import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);
  try {
    const boards = await Board.find();
    return res.status(200).json({ boards });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
