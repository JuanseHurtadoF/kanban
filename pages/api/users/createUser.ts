import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import Users from "@utils/models/User";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { name, email, password, role } = req.body;

    const user = new Users({ name, email, password, role });
    await user.save();

    res.status(200).json({ user: "" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
