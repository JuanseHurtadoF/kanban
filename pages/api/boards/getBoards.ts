import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import Column from "@utils/models/Column";
import Task from "@utils/models/Task";
import Subtask from "@utils/models/Subtask";

type Data = any;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  // Check for missing environment variables or wrong request method
  if (!process.env.MONGODB_URL) {
    return res
      .status(500)
      .json({ message: "Missing MONGODB_URL environment variable" });
  }
  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Connect to the database
  try {
    await connectDB(process.env.MONGODB_URL);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Failed to connect to the database: ${error.message}` });
  }

  // Get all boards and their columns and tasks
  try {
    // @ts-ignore
    const boards = await Board.find()
      .populate({
        path: "columns",
        model: Column,
        populate: {
          path: "tasks",
          model: Task,
          populate: {
            path: "subtasks",
            model: Subtask,
          },
        },
      })
      .lean();

    return res.status(200).json({ boards });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
