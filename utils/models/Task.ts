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
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    column: {
      type: Schema.Types.ObjectId,
      ref: "Column",
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
