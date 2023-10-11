import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Task from "@utils/models/Task";
import Subtask from "@utils/models/Subtask";
import Column from "@utils/models/Column";
import { TaskData, Error } from "@types";

type Data = TaskData | Error;

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
      subtasks: [],
      board,
      column,
      user,
    });
    const result = await task.save();

    const taskId = result._id;
    const subtaskIds = []; // To store ObjectIds of created subtasks

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
    }

    // Update the task with the new subtasks array
    // @ts-ignore
    await Task.findByIdAndUpdate(taskId, { subtasks: subtaskIds });

    // @ts-ignore
    const currentColumn = await Column.findByIdAndUpdate(
      column,
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(200).json({ ...task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
