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
      required: true,
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
    subtasks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;