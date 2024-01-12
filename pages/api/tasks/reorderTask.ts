import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Column from "@utils/models/Column";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { boardId, source, destination } = req.body;

    console.log(source, destination);

    if (!boardId || !source || !destination) {
      return res.status(500).json({ error: "Missing body parameters" });
    }

    // Check if source is the same as destination
    if (source.droppableId === destination.droppableId) {
      // @ts-ignore
      const column = await Column.findOne({ _id: source.droppableId });
      if (!column) {
        throw new Error("Column not found");
      }

      const tasks = column.tasks;
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      const saved = await column.save();
    } else {
      // @ts-ignore
      const sourceColumn = await Column.findOne({ _id: source.droppableId });
      // @ts-ignore
      const destinationColumn = await Column.findOne({
        _id: destination.droppableId,
      });

      if (!sourceColumn || !destinationColumn) {
        throw new Error("Column not found");
      }

      const sourceTasks = sourceColumn.tasks;
      const destinationTasks = destinationColumn.tasks;

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      const savedSource = await sourceColumn.save();
      const savedDestination = await destinationColumn.save();
    }
    // if same, then reoder the tasks in the column
    // if different, then remove the task from the source column and add it to the destination column in the correct index

    res.status(200).json({ message: "test" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
