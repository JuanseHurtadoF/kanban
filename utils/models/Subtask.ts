import mongoose, { Schema } from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});

const Subtask =
  mongoose.models.Subtask || mongoose.model("Subtask", SubtaskSchema);

export default Subtask;
