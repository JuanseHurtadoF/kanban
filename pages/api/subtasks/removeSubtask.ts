import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Subtask from "@utils/models/Subtask";
import Column from "@utils/models/Column";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { subtaskId } = req.body;
    try {
      // Connect to MongoDB
      await connectDB(process.env.MONGODB_URL);

      const subtask = await Subtask.findByIdAndDelete(subtaskId);

      // @ts-ignore
      //   await Column.findByIdAndUpdate(
      //     taskId,
      //     { $pull: { subtasks: subtaskId } },
      //     { new: true }
      //   );
      res.status(200).json({ message: "Subtask removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
