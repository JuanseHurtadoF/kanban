import mongoose from "mongoose";

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
    subtasks: {
      type: Array,
      default: [],
    },
    partOfColumn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Columns",
      required: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", TaskSchema);

export default Tasks;
