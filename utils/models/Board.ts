import mongoose from "mongoose";
import Column from "./Column";

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    columns: [Column.schema],
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Boards = mongoose.models.Boards || mongoose.model("Boards", BoardSchema);

export default Boards;
