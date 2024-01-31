import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    description: {
      type: String,
      min: 2,
      max: 100,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subtask",
      },
    ],
    imageUrl: {
      type: String,
      min: 2,
      max: 200,
    },
    imageId: {
      type: String,
      min: 2,
      max: 100,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
