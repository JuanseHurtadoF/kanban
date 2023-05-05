import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const Column = mongoose.models.Column || mongoose.model("Column", ColumnSchema);

export default Column;
