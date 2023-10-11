import mongoose, { Schema } from "mongoose";

const SubtaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      min: 2,
      max: 200,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

const Subtask =
  mongoose.models.Subtask || mongoose.model("Task", SubtaskSchema);

export default Subtask;
