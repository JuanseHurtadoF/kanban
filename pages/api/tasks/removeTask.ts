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
    const { taskId, columnId } = req.body;

    if (!taskId || !columnId)
      return res.status(500).json({ error: "Missing taskId or columnId" });

    const task = await Task.findByIdAndDelete(taskId);
    // @ts-ignore
    const column = await Column.findByIdAndUpdate(
      columnId,
      { $pull: { columns: columnId } },
      { new: true }
    );
    res.status(200).json({ message: `Task successfully deleted` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
