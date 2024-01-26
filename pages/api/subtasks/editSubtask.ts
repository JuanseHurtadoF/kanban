import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Subtask from "@utils/models/Subtask";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { subtaskId, newTitle } = req.body;
    try {
      // Connect to MongoDB
      await connectDB(process.env.MONGODB_URL);

      // @ts-ignore
      await Subtask.findByIdAndUpdate(
        subtaskId,
        { title: newTitle },
        { new: true }
      );

      res.status(200).json({ message: "Title changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ message: "Something went wrong. Please try again later." });
  }
}
