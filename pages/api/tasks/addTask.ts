import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Task from "@utils/models/Task";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { title, description, status, column, subtasks } = req.body;

    const columnId = column._id;
    const task = new Task({
      title,
      description,
      status,
      column: columnId,
      subtasks,
    });

    try {
      const result = await task.save();
    } catch (err) {
      console.log(err);
    }

    res.status(200).json({ task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
