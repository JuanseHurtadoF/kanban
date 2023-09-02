import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import User from "@utils/models/User";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error(
        "Please define the MONGODB_URL environment variable inside .env.local"
      );
    }

    await connectDB(process.env.MONGODB_URL);
    const { name, boardId } = req.body;

    if (req.method !== "POST") {
      return res.status(400).json({ success: false });
    }

    if (!name || !boardId) {
      return res.status(500).json({ success: false });
    }

    // @ts-ignore
    const result = await Board.findByIdAndUpdate(
      boardId,
      { name },
      { new: true }
    );
    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("Error in handler:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
