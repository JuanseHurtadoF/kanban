import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import { TaskData, Error, subtask } from "@types";
import Task from "@utils/models/Task";
import { ObjectId } from "mongodb"; // Import ObjectId
import Subtask from "@utils/models/Subtask";

type Data = TaskData | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  const { subtaskId } = req.body;

  if (!subtaskId) {
    return res.status(500).json({ error: "No task ID or subtask ID" });
  }

  try {
    // @ts-ignore
    const prevSubtask = await Subtask.findById(subtaskId);
    const changeTo = !prevSubtask.isCompleted;
    // @ts-ignore
    const subtask = await Subtask.findByIdAndUpdate(
      subtaskId,
      { $set: { isCompleted: changeTo } },
      { new: true }
    );

    return res.status(200).json({ ...subtask });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
