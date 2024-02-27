import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Board from "@utils/models/Board";
import User from "@utils/models/User";
import Column from "@utils/models/Column";
import Task from "@utils/models/Task";
import Subtask from "@utils/models/Subtask";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { newBoard, user } = req.body;
    const columns = ["To Do", "In Progress", "Done"];
    const tasks = newBoard.tasks;

    // Create board
    const board = new Board({ name: newBoard.boardName, user });
    const result = await board.save();

    // Create columns
    const columnPromises = columns.map(async (columnName) => {
      const column = new Column({ name: columnName, boardId: result._id });
      return await column.save();
    });

    // Wait for all column promises to resolve
    const savedColumns = await Promise.all(columnPromises);

    // Extract the _id values from the saved columns
    const columnIds = savedColumns.map((col) => col._id);

    // Update the board with the new column references
    // @ts-ignore
    await Board.findByIdAndUpdate(result._id, {
      $push: { columns: { $each: columnIds } },
    });

    // Create tasks
    const taskPromises = tasks.forEach(async (task) => {
      const newTask = await new Task({
        title: task.title,
        description: task.description,
        subtasks: [],
        board: result._id,
        column: columnIds[0],
        user,
      }).save();
      const savedTask = await newTask.save();

      // @ts-ignore
      await Column.findByIdAndUpdate(columnIds[0], {
        $push: { tasks: savedTask._id },
      });

      task.subtasks.map(async (subtask) => {
        console.log("subtask: ", subtask);
        const newSubtask = await new Subtask({
          title: subtask,
          isCompleted: false,
          taskId: savedTask._id,
        });
        const savedSubtask = await newSubtask.save();
        // @ts-ignore
        const updatedTask = await Task.findByIdAndUpdate(savedTask._id, {
          $push: { subtasks: savedSubtask._id },
        });
        const savedUpdatedTask = await updatedTask.save();
      });
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in handler:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
