import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const boards = await Board.find();

    boards.forEach((board) => {
      board.columns.forEach(async (column: any) => {
        // console.log(column._id.toString());
        const newCol = await Column.findById("644a9290850f3117d277a99b");
        // console.log(newCol);
      });
    });

    return res.status(200).json({ boards });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
