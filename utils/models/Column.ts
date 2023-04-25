import mongoose, { Schema } from "mongoose";

const ColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const Column =
  mongoose.models.Column || mongoose.model("Column", ColumnSchema);

export default Column;
