import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import { TaskData, Error, subtask } from "@types";
import Task from "@utils/models/Task";
import { ObjectId } from "mongodb"; // Import ObjectId

type Data = TaskData | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  const { taskId, subtaskId } = req.body;

  if (!taskId || !subtaskId) {
    return res.status(500).json({ error: "No task ID or subtask ID" });
  }

  try {
    // @ts-ignore
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res.status(500).json({ error: "Task not found" });
    }

    const subtask = task.subtasks.find((sub) =>
      sub._id.equals(new ObjectId(subtaskId))
    );

    if (!subtask) {
      return res.status(500).json({ error: "Subtask not found" });
    }

    subtask.isCompleted = !subtask.isCompleted; // Toggle isCompleted

    await task.save();

    console.log(task);

    return res.status(200).json({ ...task });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
