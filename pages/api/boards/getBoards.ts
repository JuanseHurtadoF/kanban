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
    const apiResponse = await Board.find();

    const boards = await Promise.all(
      apiResponse?.map(async (board) => {
        const updatedColumns = await Promise.all(
          board.columns.map(async (column: any) => {
            const newCol = await Column.findById(column._id);
            return newCol;
          })
        );
        board.columns = updatedColumns;
        return board;
      })
    );

    return res.status(200).json({ boards });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
