import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Task from "@utils/models/Task";
import Subtask from "@utils/models/Subtask";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);
  try {
    if (req.method !== "PUT")
      return res.status(500).json({ error: "Wrong request method" });

    const { taskId, title, description, subtasks } = req.body;

    if (!taskId) return res.status(500).json({ error: "Missing taskId" });
    if (!title && !description && !subtasks)
      return res
        .status(500)
        .json({ error: "Got task ID but no properties to update" });

    const propertiesToUpdate = {};
    if (title) propertiesToUpdate["title"] = title;
    if (description) propertiesToUpdate["description"] = description;

    const subtaskIds = [];

    if (subtasks && subtasks.length > 0) {
      for (let i = 0; i < subtasks.length; i++) {
        const subtask = new Subtask({
          title: subtasks[i].title,
          isCompleted: subtasks[i].isCompleted,
          taskId: taskId, // Set the taskId to the ID of the task you just created
        });
        const savedSubtask = await subtask.save(); // Save the subtask to the database
        subtaskIds.push(savedSubtask._id); // Push the ObjectId of the saved subtask
      }
      propertiesToUpdate["subtasks"] = subtaskIds;
    }

    // @ts-ignore
    const result = await Task.findByIdAndUpdate(taskId, propertiesToUpdate, {
      new: true,
    });
    const savedResult = await result.save();

    res.status(200).json({ message: `Task successfully Edited` });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
