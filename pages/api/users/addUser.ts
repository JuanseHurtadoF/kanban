import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import User from "@utils/models/User";
import { UserType, Error } from "@types";

type Data = UserType;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  await connectDB(process.env.MONGODB_URL);

  try {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(200).json({ ...user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
