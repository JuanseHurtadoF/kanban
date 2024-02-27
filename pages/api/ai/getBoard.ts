import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@utils/connectDB.js";
import OpenAI from "openai";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB(process.env.MONGODB_URL);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an expert project manager and you will help someone create a board. The user will provide a prompt and you will return a list of tasks in a ToDo column. You will return an array of objects (tasks) in the following format: { title: string, description: string, subtasks: array of strings }. You will also return a board name. `,
        },
        {
          role: "user",
          content: `An example of the JSON you should return is
            boardName: "Design and Development", 
            tasks: [
                {
                    title: "Design wireframes",
                    description: "Make initial wireframes for client approval",
                    subtasks: ["Meet with client", "Send initial proposal", "Confirm approval to design team"]
                }
            ]
            
            `,
        },
        {
          role: "user",
          content: `I need to create a board. The board is about: a board for a website Im making for a client. Design and development`,
        },
      ],
    });
    const tasks = response.choices[0].message.content;
    const parsedTasks = JSON.parse(tasks);

    return res.status(200).json({ ...parsedTasks });
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
