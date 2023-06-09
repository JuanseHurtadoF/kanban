import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Task from "@utils/models/Task";
import Column from "@utils/models/Column";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { title, description, subtasks, board, column, user } = req.body;

    const task = new Task({
      title,
      description,
      subtasks,
      board,
      column,
      user,
    });
    const result = await task.save();

    const currentColumn = await Column.findByIdAndUpdate(
      column,
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(200).json({ message: "test" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
