import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: { type: String, required: true },
    status: { type: String, required: true, default: "todo" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", schema);
