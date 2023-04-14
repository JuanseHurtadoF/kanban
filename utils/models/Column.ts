import mongoose from "mongoose";
import Tasks from "./Task";

const ColumnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    tasks: [Tasks.schema],
    partOfBoard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boards",
      required: true,
    },
  },
  { timestamps: true }
);

const Columns =
  mongoose.models.Columns || mongoose.model("Columns", ColumnSchema);

export default Columns;
