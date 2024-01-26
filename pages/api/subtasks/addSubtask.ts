import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Subtask from "@utils/models/Subtask";
import Task from "@utils/models/Task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { taskId, subtaskId, subtaskTitle } = req.body;
    if (!taskId || !subtaskId || !subtaskTitle) {
      return res.status(500).json({ message: "Please enter all fields" });
    }

    try {
      // Connect to MongoDB
      await connectDB(process.env.MONGODB_URL);

      const subtask = await new Subtask({
        _id: subtaskId,
        title: subtaskTitle,
        isCompleted: false,
        taskId,
      });
      const savedSubtask = await subtask.save();

      // console.log(subtask);

      // @ts-ignore
      await Task.findByIdAndUpdate(taskId, {
        $push: { subtasks: savedSubtask._id },
      });

      res.status(200).json({ message: "Subtask added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
