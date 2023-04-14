import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  

  res.status(200).json({ name: "John Doe" });
}
